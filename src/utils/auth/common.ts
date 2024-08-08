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
        console.log('消息订阅成功：', res);
        resolve(true);
      },
      fail: (err) => {
        console.log('消息订阅失败：', err);
        reject(err);
      }
    });
  });
}

/**
 * 打开地图
 */
export const openMap = (params: OpenMap) => {
  return new Promise<boolean>((resolve, reject) => {
    const { latitude, longitude, name, address } = params;
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
        console.log('openMap fail:>> ', err);
        reject(err);
      }
    });
  });
};
