/*
 * @Author: dushuai
 * @Date: 2024-08-04 15:22:19
 * @LastEditors: dushuai
 * @LastEditTime: 2024-09-09 20:32:31
 * @Description: CustomTabBar
 */
// import { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import classNames from 'classnames';

import { useSelector, useCommonStore } from '@/store';

import './index.scss';

export default function CustomTabBar() {

  const { tabbarList, tabbarActive } = useCommonStore(useSelector(['tabbarList', 'tabbarActive']));

  const switchTab = (item: App.Tabbar) => {
    Taro.switchTab({ url: item.pagePath });
  };

  return <View className="CustomTabBar-nb3sp97 ios">
    <View className="CustomTabBar-wrapper">
      {
        (tabbarList || []).map((item, index) => (
          <View key={index} className={classNames('CustomTabBar-item')} onClick={() => switchTab(item)}>
            <Image className="CustomTabBar-item-icon" src={tabbarActive === item.key ? item.selectedIconPath : item.iconPath} />
            <View className={classNames('CustomTabBar-item-text', { 'is-active': tabbarActive === item.key })}>{item.text}</View>
          </View>
        ))
      }
    </View>
  </View>;
}
