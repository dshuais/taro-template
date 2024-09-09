/*
 * @Author: dushuai
 * @Date: 2024-09-04 20:35:02
 * @LastEditors: dushuai
 * @LastEditTime: 2024-09-05 21:31:01
 * @description: 心平气和
 */
import { Text, View } from '@tarojs/components';
import classNames from 'classnames';

import './index.scss';

export default function FormItem(props: Props) {

  const {
    label, labelWidth, required, children, border = true, isArrows = false, inline = true, align = 'center',
    className
  } = props;

  return (
    <View
      className={classNames(
        'FormItem-tyu091m min-h-11 w-full flex justify-between px-4 py-[20px] bg-white',
        { 'FormItem-tyu091m-border': border, 'flex-col !items-start': !inline, className }
      )}
      style={{ alignItems: align }}
    >
      <View
        className={classNames('FormItem-tyu091m-label flex items-start', { 'mb-2 mt-[28px]': !inline })}
        style={{ width: `${labelWidth}rpx` }}
      >
        {
          required && <Text className="text-[#D43030] text-[26px] mr-[2px]">*</Text>
        }
        {label}
      </View>

      <View className="flex items-center flex-1 justify-end">
        {children}
        {
          isArrows && <i className="ic ic-a-huaban7 !text-[32px] ml-1 FormItem-tyu091m-arrows" />
        }
      </View>
    </View>
  );
}

type Props = {
  label?: string
  labelWidth?: number
  required?: boolean
  border?: boolean
  children?: React.ReactNode
  isArrows?: boolean
  inline?: boolean
  align?: 'center' | 'flex-start' | 'flex-end'
  className?: string
}
