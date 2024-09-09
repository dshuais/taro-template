import { useEffect } from 'react';
import Taro from '@tarojs/taro';
import { useSetState } from 'ahooks';

import { getLocation, getSetting } from '@/utils/auth';
import $toast from '@/utils/toast';
import { useAppStore, useSelector } from '@/store';

/**
 * 获取地区信息
 * @returns
 */
export default function useRegion(props?: Props) {

  const key = 'U4MBZ-3U3OQ-AHF5G-BNXOC-IKJ3O-FFFOJ';

  const { isGetAdress = true } = props || {};

  const { adress, SET_STATE } = useAppStore(useSelector(['adress', 'SET_STATE']));
  const [state, setState] = useSetState({
    longitude: 0,
    latitude: 0,

    adress: adress
  });

  /**
   * 获取地区信息
   * @param failTips 当拒绝定位时是否弹出弹窗
   */
  async function getRegion(failTips = false, forceAdress = false) {

    if(state.adress.city && !failTips) return;
    console.log('getRegion:>> ');

    try {
      // TODO: 获取地区信息
      const list = await getSetting();
      console.log('授权列表:>> ', list);

      // if(list.authSetting['scope.userLocation']) {
      const data = await getLocation({}, failTips);
      const { longitude, latitude } = data;
      setState({ longitude, latitude });
      SET_STATE({
        coord: { longitude, latitude }
      });

      if(isGetAdress || forceAdress) {
        Taro.request({
          url: getMapApi({ longitude, latitude }),
          header: {
            'Content-Type': 'application/json'
          },
          data: {},
          method: 'GET',
          success: (res) => {
            // console.log('当前地址所有数据:>> ', res);
            if(res.statusCode === 200 && res.data.status === 0) {
              // 从返回值中提取需要的业务地理信息数据 国家、省、市、县区、街
              setState({
                adress: res.data.result.address_component
              });
              SET_STATE({
                adress: res.data.result.address_component
              });
            }
          },
          fail: () => {
            $toast.error('获取地址失败');
          }
        });
      }

      // }

    } catch(error) {
      console.error('getRegion error:>> ', error);
    }
  }

  function getMapApi({ longitude, latitude }) {
    return `https://apis.map.qq.com/ws/geocoder/v1?location=${latitude},${longitude}&key=${key}&get_poi=1`;
  }

  useEffect(() => {
    getRegion();
  }, []);

  return {
    latitude: state.latitude,
    longitude: state.longitude,
    /** 省市区详细地址 */
    adress: state.adress,
    getRegion
  };
}

type Props = {
  isGetAdress?: boolean
}
