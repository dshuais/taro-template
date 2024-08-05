import Taro from '@tarojs/taro';

/** 获取登录凭证(code) */
export function getCode() {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: function (res) {
        resolve(res.code);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
}
/** 静默授权用户 wechatId */
export function getAuthToken() {
  getCode()
    .then(async code => {
      // const wechatId = await authorize({ code, appId: config.appId });
    })
    .catch(err => {
      console.error(err || '静默授权失败');
    });
}

/**
 * 授用户信息 (须在点击的回调中调用)
 * @param {Function} success
 * @param {Function} error
 */
export function authUserProfile(success: () => void, error: () => void) {
  Taro.showLoading({ title: '授权中', mask: true });
  // 获取用户信息并且保存用户信息
  Taro.getUserProfile({
    lang: 'zh_CN',
    desc: '用于精准提供本书服务' // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  })
    .then(res => {
      if (res.userInfo) {
        const {
          avatarUrl,
          city,
          country,
          gender,
          language,
          nickName,
          province
        } = res.userInfo;
        console.log(
          avatarUrl,
          city,
          country,
          gender,
          language,
          nickName,
          province
        );
        // return updateUserBaseInfo({
        //   nickname: nickName,
        //   language,
        //   headimgurl: avatarUrl,
        //   province,
        //   country,
        //   city,
        //   sex: gender,
        //   wechatUserId: wechatId
        // })
        //   .then(() => {
        //     Taro.hideLoading();
        //     Taro.showToast({ title: '授权成功', mask: true });
        //   })
        //   .then(() => {
        //     // 滚动到顶部，避免新用户指引错位
        //     // Taro.pageScrollTo({
        //     //   scrollTop: 0,
        //     //   duration: 0
        //     // });
        //     success && success();
        //   });
      } else {
        Taro.hideLoading();
        error && error();
        return Promise.reject({
          message: '授权失败'
        });
      }
    })
    .catch(() => {
      Taro.hideLoading();
      Taro.showToast({ title: '授权失败', mask: true });
      error && error();
    });
}

/** 保存临时图片到本地 */
export function saveImagePhotosAlbum(tempFilePath: string) {
  if (!tempFilePath) return;
  Taro.saveImageToPhotosAlbum({
    filePath: tempFilePath,
    success: () => {
      Taro.showToast({
        title: '保存成功',
        icon: 'none',
        duration: 2000
      });
    },
    fail: () => {
      Taro.showModal({
        title: '提示',
        content: '请先授权再保存此图片',
        showCancel: false,
        success(data) {
          if (data.confirm) {
            Taro.openSetting({
              success(settingdata) {
                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                  Taro.saveImageToPhotosAlbum({
                    filePath: tempFilePath,
                    success: function () {
                      Taro.showToast({
                        title: '保存成功',
                        icon: 'none',
                        duration: 2000
                      });
                    }
                  });
                } else {
                  Taro.showModal({
                    title: '提示',
                    content: '授权失败，请稍后重新获取',
                    showCancel: false
                  });
                }
              }
            });
          }
        }
      });
    }
  });
}

/** 保存网络图片到本地 */
export function saveImageToPhotosAlbum(url: string) {
  if (!url) return;
  Taro.downloadFile({
    url,
    success: res => {
      saveImagePhotosAlbum(res.tempFilePath);
    }
  });
}
