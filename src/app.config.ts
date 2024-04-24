/*
 * @Author: dushuai
 * @Date: 2024-04-23 18:33:22
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-24 16:42:40
 * @description: defineAppConfig
 */
export default defineAppConfig({
  // 页面
  pages: [
    'pages/index/index',
    'pages/my/index'
  ],

  //  配置分包
  subPackages: [
    {
      root: 'pagesLogin',
      pages: [
        "login/index",
        "register/index"
      ],
      independent: false // 是否是独立分包
    },
    {
      root: 'pagesDetail',
      pages: [
        "info/index",
        "webview/index"
      ],
      independent: false
    }
  ],

  // 分包预加载
  preloadRule: {
    "pages/index/index": {
      network: 'all',
      packages: ['pagesDetail'] //   __APP__ 主包
    },
    "pages/my/index": {
      network: 'all',
      packages: ['pagesLogin']
    }
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
        pagePath: 'pages/index/index',
        // iconPath: 'static/images/tabbar/home.png',
        // selectedIconPath: 'static/images/tabbar/home_active.png',
        text: '首页',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
      }
    ]
  }
})
