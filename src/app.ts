/*
 * @Author: dushuai
 * @Date: 2024-04-23 18:33:22
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-01 21:01:39
 * @description: app
 */
import { PropsWithChildren } from 'react';
import { useLaunch } from '@tarojs/taro';

import '@/assets/style/app.scss';

function App({ children }: PropsWithChildren<unknown>) {
  useLaunch(() => {
    console.log('App launched.');
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
