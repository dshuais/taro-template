import Taro from '@tarojs/taro';
import { OpenMap, SubMsg } from '.';

/**
 * 订阅消息
 */
export function subscribeMessage(params: SubMsg) {
  return new Promise<boolean>((resolve, reject) => {
    const { tmplIds, entityIds } = params;
    Taro.requestSubscribeMessage({
      tmplIds,
      entityIds,
      success: (res) => {
        console.log('subscribeMessage success:>> ', res);
        resolve(true);
      },
      fail: (err) => {
        console.warn('subscribeMessage fail:>> ', err);
        reject(err);
      }
    });
  });
}

/**
 * 获取当前坐标位置
 * @param params
 * @returns
 */
export const getLocation = (params?: Taro.getLocation.Option, failTips = true) => {
  return new Promise<Taro.getLocation.SuccessCallbackResult>((resolve, reject) => {
    Taro.getLocation({
      ...params,
      success: (res) => {
        // console.log('getLocation success:>> ', res);
        resolve(res);
      },
      fail: (err) => {
        console.warn('getLocation fail:>> ', err);
        // reject(err);
        if(err.errMsg === 'getLocation:fail auth deny' && failTips) {
          // 跳转授权页面
          Taro.showModal({
            title: '提示',
            content: '请先授权再使用该功能',
            showCancel: true,
            success(data) {
              if(data.confirm) {
                Taro.openSetting({
                  success(settingdata) {
                    if(settingdata.authSetting['scope.userLocation']) {
                      Taro.getLocation({
                        ...params,
                        success: (res) => {
                          resolve(res);
                        }
                      });
                    } else {
                      console.warn('getLocation fail:>> ', err);
                      reject(err);
                    }
                  }
                });
              }
            }
          });
        } else {
          reject(err);
        }
      }
    });
  });
};
/**
 * 打开地图
 */
export const openMap = (params?: OpenMap) => {
  return new Promise<boolean>((resolve, reject) => {
    const { latitude, longitude, name, address } = params || {};
    Taro.openLocation({
      latitude: +latitude!,
      longitude: +longitude!,
      name,
      address,
      success: (res) => {
        console.log('openMap success:>> ', res);
        resolve(true);
      },
      fail: (err) => {
        console.warn('openMap fail:>> ', err);
        reject(err);
      }
    });
  });
};

/**
 * 打开地图选取位置
 * @returns
 */
export const chooseLocation = (option?: Taro.chooseLocation.Option) => {
  return new Promise<Taro.chooseLocation.SuccessCallbackResult>((resolve, reject) => {
    Taro.chooseLocation({
      ...option,
      success: (res) => {
        // console.log('chooseLocation success:>> ', res);
        resolve(res);
      },
      fail: (err) => {
        console.warn('chooseLocation fail:>> ', err);
        reject(err);
      }
    });
  });
};

/**
 * 监听网络状态
 */
export const networkStatusChange = () => {
  return new Promise<Taro.getNetworkType.SuccessCallbackResult>((resolve, reject) => {
    Taro.getNetworkType({
      success(res) {
        if(res.networkType !== 'none') {
          setTimeout(() => {
            // 跳转首页页面
          }, 500);
        } else if(res.networkType === 'none') {
          setTimeout(() => {
            // 跳转降级页
          }, 500);
        }
        resolve(res);
      },
      fail(err) {
        console.warn('networkStatusChange fail:>> ', err);
        reject(err);
      }
    });
  });
};

/**
 * 保存临时图片到本地
 */
export function saveImageToPhotosAlbum(filePath: string) {
  return new Promise<boolean>((resolve, reject) => {
    if(!filePath) return console.warn('filePath is empty:>> ');
    Taro.saveImageToPhotosAlbum({
      filePath,
      success: () => {
        // Taro.showToast({
        //   title: '保存成功',
        //   icon: 'none',
        //   duration: 2000
        // });
        resolve(true);
      },
      fail: () => {
        Taro.showModal({
          title: '提示',
          content: '请先授权再保存此图片',
          showCancel: false,
          success(data) {
            if(data.confirm) {
              Taro.openSetting({
                success(settingdata) {
                  if(settingdata.authSetting['scope.writePhotosAlbum']) {
                    Taro.saveImageToPhotosAlbum({
                      filePath,
                      success: function() {
                        resolve(true);
                      }
                    });
                  } else {
                    // Taro.showModal({
                    //   title: '提示',
                    //   content: '授权失败，请稍后重新获取',
                    //   showCancel: false
                    // });
                    console.warn('writePhotosAlbum fail:>> ', false);
                    reject(false);
                  }
                }
              });
            }
          }
        });
      }
    });
  });
}

/**
 * 保存网络图片到本地
 */
export function saveNetImageToPhotosAlbum(url: string) {
  if(!url) return console.warn('url is empty:>> ');
  Taro.downloadFile({
    url,
    success: res => {
      saveImageToPhotosAlbum(res.tempFilePath);
    }
  });
}

/**
 * 获取用户授权列表
 * @returns
 */
export function getSetting() {
  return new Promise<Taro.getSetting.SuccessCallbackResult>((resolve, reject) => {
    Taro.getSetting({
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}
