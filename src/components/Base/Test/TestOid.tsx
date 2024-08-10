/*
 * @Author: dushuai
 * @Date: 2024-08-10 16:41:48
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-10 16:48:16
 * @description: TestOid
 */
import { useAppStore, useSelector } from '@/store';

export default function TestOid() {

  // const { openId, SET_STATE } = useAppStore(state => state);
  const { openId, SET_STATE } = useAppStore(useSelector(['openId', 'SET_STATE']));

  return (
    <div>
      <div>openid: {openId}</div>
      <button onClick={() => SET_STATE({ openId: openId === '123' ? '' : '123' })}>set openid</button>
    </div>
  );
}
