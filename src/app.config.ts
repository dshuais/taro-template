/*
 * @Author: dushuai
 * @Date: 2024-04-23 18:33:22
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-24 16:39:36
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
  }
})
