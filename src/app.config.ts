/*
 * @Author: dushuai
 * @Date: 2024-04-23 18:33:22
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-24 16:42:40
 * @description: defineAppConfig
 */
import { PAGE_LIST, SUB_PACKAGES, PRELOAD_RULE } from '@/constants/PAGE'

export default defineAppConfig({
  // 页面
  pages: [
    ...PAGE_LIST
  ],

  //  配置分包
  subPackages: [
    ...SUB_PACKAGES
  ],

  // 分包预加载
  preloadRule: {
    ...PRELOAD_RULE
  },

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#000',
    navigationBarTitleText: 'Taro Demo',
    navigationBarTextStyle: 'white'
  },

  // tabbar
  tabBar: {
    custom: false, // 是否自定义tabbar
    color: '#fff',
    selectedColor: '#885525',
    backgroundColor: '#000',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        // iconPath: 'static/images/tabbar/home.png',
        // selectedIconPath: 'static/images/tabbar/home_active.png',
        text: '首页',
      },
      {
        pagePath: 'pages/personal/index',
        text: '我的',
      }
    ]
  }
})
