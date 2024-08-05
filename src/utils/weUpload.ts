import Taro from '@tarojs/taro';

export function Upload({ path, url, name }) {
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: `${process.env.TARO_APP_BASE_URL}/${url}`, //接口地址
      filePath: path,
      name,
      header: {
        // cookie: xxx
      },
      success(res) {
        resolve(JSON.parse(res.data));
      },
      fail(err) {
        reject(err);
      }
    });
  });
}

/**
 * 拍摄或从手机相册中选择图片或视频
 * @param {Object} param {maxDuration, mediaType, sourceType}
 */
export function UploadMedia({ maxDuration, mediaType, sourceType }) {
  return new Promise((resolve, reject) => {
    const MAX_DURATION = maxDuration || 30; // 秒
    Taro.chooseMedia({
      count: 1,
      mediaType: mediaType || ['image', 'video'],
      sourceType: sourceType || ['album', 'camera'],
      maxDuration: MAX_DURATION,
      camera: 'back',
      success: res => {
        const files = res.tempFiles;
        if (files.some(file => file.duration > MAX_DURATION)) {
          return Taro.showToast({
            title: `视频时长不能超过${MAX_DURATION}秒`,
            icon: 'none',
            duration: 2000
          });
        }
        Taro.showLoading({
          title: '正在上传...',
          mask: true
        });
        const promises = files.map(file => {
          const result = { url: '调用接口' }; // uploadFile({ filePath: file.tempFilePath });
          return result;
        });
        Promise.all(promises)
          .then(dataArr => {
            resolve({
              data: dataArr.map(arr => arr?.url),
              mediaType: res.type
            });
          })
          .catch(err => {
            console.warn(err);
            reject(err);
          })
          .finally(() => {
            Taro.hideLoading();
          });
      }
    });
  });
}

/**
 * 选择图片（默认上传）
 * @param {Object} param Taro.chooseImage参数，并增加 upload 是否上传
 * @returns {Promise} 图片链接数组
 */
export function ChooseImage({
  count = 9, // 默认9
  sizeType = null,
  sourceType = null,
  upload: _upload = true // 是否上传 默认上传
}) {
  return new Promise((resolve, reject) => {
    Taro.chooseImage({
      count: count, // 默认9
      sizeType: sizeType || ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: sourceType || ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const filePaths = res.tempFilePaths || [];

        // 不上传则直接返回 tempFilePath
        if (!_upload) {
          return resolve(filePaths);
        }

        const promises = filePaths.map(path => {
          return { url: '调用接口' }; // convert.uploadFile({ filePath: path });
        });
        Taro.showLoading({
          title: '正在上传图片...',
          mask: true
        });

        Promise.all(promises)
          .then(data => {
            const list = data.map(arr => arr?.url);
            Taro.hideLoading();
            resolve(list);
          })
          .catch(err => {
            console.warn(err);
            reject(err);
          })
          .finally(() => {
            Taro.hideLoading();
          });
      }
    });
  });
}
