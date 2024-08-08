import Taro from '@tarojs/taro';
import { useAppStore } from '@/store';

/** 获取登录凭证(code) */
export function getCode() {
  return new Promise<string>((resolve, reject) => {
    Taro.login({
      success: function(res) {
        resolve(res.code);
      },
      fail: function(res) {
        reject(res);
      }
    });
  });
}

/**
 * 静默授权用户 openId
 */
export function getAuthToken() {
  getCode()
    .then(async _code => {
      // const openId = await authorize({ code, appId: process.env.TARO_APP_ID });
      // useAppStore.getState().SET_STATE({ openId });
    })
    .catch(err => {
      console.warn('getAuthToken fail:>> ', err);
    });
}

/**
 * 授用户信息 (须在点击的回调中调用)
 */
export function authUserProfile(success: () => void, error: () => void) {
  Taro.getUserProfile({
    lang: 'zh_CN',
    desc: '用于精准提供服务' // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  })
    .then(res => {
      // 具体逻辑 自行处理
      const { userInfo, signature, encryptedData } = res;
      console.log('getUserProfile', { userInfo, signature, encryptedData });
      if(userInfo) {
        const { avatarUrl, city, country, gender, language, nickName, province } = res.userInfo;
        const { openId } = useAppStore.getState();

        console.log(avatarUrl, city, country, gender, language, nickName, province, openId);
        // return updateUserBaseInfo({
        //   nickName, language, headimgurl: avatarUrl, province, country, city, sex: gender, wechatUserId: openId
        // });

      } else {
        error && error();
      }
    })
    .then(() => {
      success && success();
    })
    .catch(() => {
      error && error();
    });
}
