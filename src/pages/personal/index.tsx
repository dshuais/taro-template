/*
 * @Author: dushuai
 * @Date: 2024-04-24 16:01:26
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-10 16:48:37
 * @description: Personal
 */
import { View } from '@tarojs/components';
import Test from '@/components/Base/Test';
import TestOid from '@/components/Base/Test/TestOid';

export default function Personal() {
  return (
    <View>
      <View>我的</View>
      <div>我是最新的标签</div>
      <p>我是p</p>
      <span>我是span</span>

      <Test title="我是测试" />
      <TestOid />
    </View>
  );
}
