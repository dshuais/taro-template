/*
 * @Author: dushuai
 * @Date: 2024-04-23 18:33:22
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-24 16:39:07
 * @description: index
 */
import { View, Text, Button } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  function handleLogin() {
    Taro.navigateTo({ url: '/pages/my/index' })
  }

  return (
    <View className='index'>
      <Text className='title'>Hello world!</Text>
      <Text>{process.env.TARO_ENV}</Text>
      <Button onClick={handleLogin}>按钮</Button>
      <Button onClick={() => Taro.navigateTo({ url: '/pagesLogin/login/index' })}>登陆</Button>
      <Button onClick={() => Taro.navigateTo({ url: '/pagesLogin/register/index' })}>注册</Button>
      <Button onClick={() => Taro.navigateTo({ url: '/pagesDetail/info/index' })}>info</Button>
      <Button onClick={() => Taro.navigateTo({ url: '/pagesDetail/webview/index' })}>webview</Button>
    </View>
  )
}
