/*
 * @Author: dushuai
 * @Date: 2024-08-27 23:04:28
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-29 00:11:11
 * @description: 心平气和
 */
import { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import { getSystemInfo } from '@/utils/tools';

/**
 * 自动填充头部高度 当自定义头部需要使用bg时，可以使用此组件
 *
 * 一般于HeaderWarp组件中嵌套使用
 * @returns HeaderFill
 */
export default function HeaderFill(props: Props) {

  const { height: defaultHeight } = props;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(defaultHeight || getSystemInfo().headerHeight || 0);
  }, []);

  return (
    <View className="w-full bg-[#F6F9FD] absolute top-0 left-0" style={{ height }} />
  );
}

type Props = {
  height?: number
}
