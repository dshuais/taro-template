/*
 * @Author: dushuai
 * @Date: 2025-05-12 00:37:15
 * @LastEditors: dushuai
 * @LastEditTime: 2025-08-19 00:13:42
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
  ]

  // plugins: [
  //   [
  //     'import', {
  //       'libraryName': '@nutui/nutui-react-taro',
  //       'libraryDirectory': 'dist/esm',
  //       'style': 'css',
  //       'camel2DashComponentName': false,
  //       'customName': (name, file) => {
  //         return `@nutui/nutui-react-taro/dist/es/packages/${name.toLowerCase()}`;
  //       }
  //     },
  //     'nutui-react-taro'
  //   ]
  // ]
};
