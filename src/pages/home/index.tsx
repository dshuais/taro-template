/*
 * @Author: dushuai
 * @Date: 2024-04-23 18:33:22
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-24 16:39:07
 * @description: index
 */
import { View, Text, Button } from "@tarojs/components";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";

import { PAGE } from "@/constants/PAGE";
import { useAppStore } from "@/store";

import "./index.scss";

export default function Home() {

  const { token, SET_TOKEN, REMOVE_TOKEN, SET_STATE } = useAppStore(state => state);

  useDidShow(() => {
    console.log("Page show:>> ", token);
    console.log('当前环境:>> ', process.env.NODE_ENV, process.env.TARO_APP_TITLE);
  })

  useLoad(() => {
    console.log("Page loaded.");
  });

  function handleLogin() {
    Taro.switchTab({ url: PAGE.PERSONAL });
  }

  return (
    <View className='index'>
      <Text className='title'>Hello world! {token}</Text>
      <Text>{process.env.TARO_ENV}</Text>
      <Button onClick={() => SET_STATE({ token: '123456' })}>按钮+</Button>
      <Button onClick={() => SET_TOKEN('456789')}>set</Button>
      <Button onClick={() => REMOVE_TOKEN()}>reset</Button>
      <Button onClick={handleLogin}>按钮跳转</Button>
      <Button
        onClick={() => Taro.navigateTo({ url: "/pagesLogin/login/index" })}
      >
        登陆
      </Button>
      <Button
        onClick={() => Taro.navigateTo({ url: "/pagesLogin/register/index" })}
      >
        注册
      </Button>
      <Button
        onClick={() => Taro.navigateTo({ url: "/pagesDetail/info/index" })}
      >
        info
      </Button>
      <Button
        onClick={() => Taro.navigateTo({ url: "/pagesDetail/webview/index" })}
      >
        webview
      </Button>
    </View>
  );
}
