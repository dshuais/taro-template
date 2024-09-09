/*
 * @Author: dushuai
 * @Date: 2024-08-26 22:18:32
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-26 22:36:38
 * @description: 心平气和
 */
import Taro, { usePageScroll } from '@tarojs/taro';
import { useSetState } from 'ahooks';

type Props = {
  color?: string
  activedColor?: string
  background?: string
  activedBackground?: string
  top?: number
};

/**
 * 头部组件hooks
 */
export default function useHeaderWarp(props?: Props) {

  const { color = '#fff', activedColor = '#000', background = 'transparent', activedBackground = '#fff', top = 20 } = props || {};

  const [state, setState] = useSetState({
    top: 0,
    color,
    background
  });

  usePageScroll((res) => {
    const is = res.scrollTop > top;

    setState({
      top: res.scrollTop,
      color: is ? activedColor : color,
      background: is ? activedBackground : background
    });

    Taro.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: is ? activedBackground : background
    });

  });

  return {
    top: state.top,
    color: state.color,
    background: state.background
  };

}
