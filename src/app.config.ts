/*
 * @Author: dushuai
 * @Date: 2024-04-23 18:33:22
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-04 15:21:53
 * @description: defineAppConfig
 */
import { PAGE_LIST, SUB_PACKAGES, PRELOAD_RULE } from '@/constants/PAGE';

export default defineAppConfig({
  // 页面
  pages: [...PAGE_LIST],

  //  配置分包
  subPackages: [...SUB_PACKAGES],

  // 分包预加载
  preloadRule: {
    ...PRELOAD_RULE
  },

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro Demo',
    navigationBarTextStyle: 'black'
  },

  // tabbar
  tabBar: {
    custom: true, // 是否自定义tabbar
    color: '#000',
    selectedColor: '#4989ff',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        iconPath: 'assets/images/tabbar/home.png',
        selectedIconPath: 'assets/images/tabbar/home_actived.png',
        text: '首页'
      },
      {
        pagePath: 'pages/personal/index',
        iconPath: 'assets/images/tabbar/personal.png',
        selectedIconPath: 'assets/images/tabbar/personal_actived.png',
        text: '我的'
      }
    ]
  },

  usingComponents: {},
  requiredBackgroundModes: [], // 'audio', 'location'
  lazyCodeLoading: 'requiredComponents'
});
