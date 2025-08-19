/*
 * @Author: dushuai
 * @Date: 2025-05-12 00:37:15
 * @LastEditors: dushuai
 * @LastEditTime: 2025-08-19 22:14:00
 * @description: 心平气和
 */
// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }]
  ],

  plugins: [
    [
      'import', {
        'libraryName': '@nutui/nutui-react-taro',
        'camel2DashComponentName': false,
        'customName': (name, file) => {
          return `@nutui/nutui-react-taro/dist/es/packages/${name.toLowerCase()}/index.js`;
        },
        // 自动加载 scss 样式文件
        customStyleName: (name) => `@nutui/nutui-react-taro/dist/es/packages/${name.toLowerCase()}/style/index.js`
        // 自动加载 css 样式文件
        // customStyleName: (name) => `@nutui/nutui-react-taro/dist/es/packages/${name.toLowerCase()}/style/css`

        // JMAPP 主题
        // 自动加载 scss 样式文件
        // customStyleName: (name) => `@nutui/nutui-react-taro/dist/es/packages/${name.toLowerCase()}/style-jmapp`,
        // 自动加载 css 样式文件
        // customStyleName: (name) => `@nutui/nutui-react-taro/dist/es/packages/${name.toLowerCase()}/style-jmapp/css`

        // jrkf 端主题
        // 自动加载 scss 样式文件
        // customStyleName: (name) => `@nutui/nutui-react-taro/dist/es/packages/${name.toLowerCase()}/style-jrkf`,
        // 自动加载 css 样式文件
        // customStyleName: (name) => `@nutui/nutui-react-taro/dist/es/packages/${name.toLowerCase()}/style-jrkf/css`
      },
      'nutui-react'
    ]
  ]
};
