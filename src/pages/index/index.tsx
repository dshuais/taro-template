/*
 * @Author: dushuai
 * @Date: 2024-04-23 18:33:22
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-24 12:19:15
 * @description: index
 */
import { View, Text, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  function handleLogin() {

  }

  return (
    <View className='index'>
      <Text className='title'>Hello world!</Text>
      <Text>{process.env.TARO_ENV}</Text>
      <Button onClick={handleLogin}>按钮</Button>
    </View>
  )
}
