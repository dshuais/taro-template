/*
 * @Author: dushuai
 * @Date: 2024-04-23 18:33:22
 * @LastEditors: dushuais 1137896420@qq.com
 * @LastEditTime: 2024-08-04 15:54:09
 * @description: index
 */
import { useEffect } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro, { useDidShow, useLoad } from '@tarojs/taro';
import { PAGE, MAIN_PAGE, SUB_PAGE, TABBAR_PAGE } from '@/constants/PAGE';
import { useAppStore } from '@/store';

import { GetTest, GetTest2, GetTest3, GetTest4 } from '@/api/api';
import { getSystemInfo } from '@/utils/tools';

import './index.scss';

export default function Home() {
  const { token, SET_TOKEN, REMOVE_TOKEN, SET_STATE } = useAppStore((state) => state);

  useLoad(() => {
    console.log('Page loaded.');
  });

  useDidShow(() => {
    console.log('Page show:>> ', token);
    console.log(
      '当前环境:>> ',
      process.env.NODE_ENV,
      process.env.TARO_APP_TITLE,
      process.env.TARO_APP_RESOURCE_URL
    );
    console.log('getSystemInfo:>> ', getSystemInfo());
  });

  useEffect(() => {
    console.log('token:>> ', token);
    console.log('TABBAR_PAGE:>> ', TABBAR_PAGE);
    console.log('PAGE:>> ', PAGE);
    console.log('MAIN_PAGE:>> ', MAIN_PAGE);
    console.log('SUB_PAGE:>> ', SUB_PAGE);
  }, []);

  function handleLogin() {
    Taro.switchTab({ url: PAGE.PERSONAL });
  }

  function handleTest(ind: number) {
    const params = { user: 'dushuai' };
    if(ind === 1) {
      params['pwd'] = '123456';
    }
    switch (ind) {
      case 0:
        GetTest(params).then(res => console.log('GetTest:>> ', res));
        break;
      case 1:
        GetTest2(params).then((res) => console.log('GetTest:>> ', res));
        break;
      case 2:
        GetTest3(params).then((res) => console.log('GetTest:>> ', res));
        break;
      case 3:
        GetTest4().then((res) => console.log('GetTest:>> ', res));
        break;
    }
  }

  return (
    <View className="index">
      <Text className="title">Hello world! 2 ==== {token}</Text>
      <Text>{process.env.TARO_ENV}</Text>
      <Button type="primary" onClick={() => handleTest(0)}>
        http
      </Button>
      <Button type="primary" onClick={() => handleTest(1)}>
        http post
      </Button>
      <Button type="primary" onClick={() => handleTest(2)}>
        http postJSON
      </Button>
      <Button type="primary" onClick={() => handleTest(3)}>
        http postERR
      </Button>
      <Button type="primary" onClick={() => SET_STATE({ token: '123456' })}>
        按钮+
      </Button>
      <Button onClick={() => SET_TOKEN('456789')}>set</Button>
      <Button onClick={() => REMOVE_TOKEN()}>reset</Button>
      <Button onClick={handleLogin}>按钮跳转</Button>
      <Button
        onClick={() => Taro.navigateTo({ url: '/pagesLogin/login/index' })}
      >
        登陆
      </Button>
      <Button
        onClick={() => Taro.navigateTo({ url: '/pagesLogin/register/index' })}
      >
        注册
      </Button>
      <Button
        onClick={() => Taro.navigateTo({ url: '/pagesDetail/info/index' })}
      >
        info
      </Button>
      <Button
        onClick={() => Taro.navigateTo({ url: '/pagesDetail/webview/index' })}
      >
        webview
      </Button>

      <div className="flex items-center">
        <button className="w-24 h-12 bg-pink-300 text-white text-2xl">
          我是按钮
        </button>
        <button>2</button>
      </div>
    </View>
  );
}
