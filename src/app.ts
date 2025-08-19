/*
 * @Author: dushuai
 * @Date: 2024-04-23 18:33:22
 * @LastEditors: dushuai
 * @LastEditTime: 2025-08-19 22:03:54
 * @description: app
 */
import { PropsWithChildren } from 'react';
import { useLaunch } from '@tarojs/taro';

import '@nutui/nutui-react-taro/dist/styles/themes/default.css';
import '@spacego/taro-components/lib/style.css';
import '@/assets/style/app.scss';

function App({ children }: PropsWithChildren<unknown>) {
  useLaunch(() => {
    console.log('App launched.');
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
