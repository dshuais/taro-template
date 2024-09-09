/*
 * @Author: dushuai
 * @Date: 2024-04-24 11:33:11
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-24 14:36:18
 * @description: login
 */

import { Text, View } from '@tarojs/components';

definePageConfig({
  navigationBarTitleText: '登陆',
  navigationBarBackgroundColor: '#000',
  navigationBarTextStyle: 'white'
});

export default function index() {
  return (
    <View>
      <Text>login</Text>
    </View>
  );
}
