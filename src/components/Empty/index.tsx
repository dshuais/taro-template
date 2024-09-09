/*
 * @Author: dushuai
 * @Date: 2024-08-27 23:04:28
 * @LastEditors: dushuai
 * @LastEditTime: 2024-09-02 23:07:49
 * @description: Empty
 */
import { View } from '@tarojs/components';

import { IMG } from '@/constants/common';
import Search from '../Search';

export default function Empty(props: Props) {

  const { text = '敬请期待~', className, showSearch, search = '搜索你感兴趣的内容' } = props;

  const style = {
    backgroundImage: `url(${IMG.empty})`,
    backgroundSize: '100% 100%'
  };

  return (
    <View className={`w-full h-full flex flex-col items-center justify-center Empty-7888 ${className}`}>
      {
        showSearch && <Search search={search} />
      }
      <View className="w-[500px] h-[500px] bg-no-repeat mt-12 Empty-7888-img" style={style} />
      <View className="text-[#314259] text-[24px]">{text}</View>
    </View>
  );
}

type Props = {
  text?: string
  className?: string
  showSearch?: boolean
  search?: string
}
