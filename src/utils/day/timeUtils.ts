/*
 * @Author: dushuai
 * @Date: 2024-07-30 22:03:50
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-02 21:10:10
 * @Description: 描述
 */
import dayjs from './dayjs';

/**
 * 格式化时间 Date 转化为指定格式的String
 * 年(y)可以用 1-4 个占位符、月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、毫秒(S)只能用 1 个占位符(是 1-3 位的数字)、周(E)、季度(q)可以用 1-2 个占位符
 * @param {string | number | Date} [date] 时间 可选，默认为当前时间
 * @param {string} [fmt] 格式 可选，默认为 yyyy-MM-dd HH:mm:ss
 * @returns {string}  时间date as fmt
 *
 * formatDate('2023-03-23 15:30:59:60', 'yyyy-MM-dd HH:mm:ss:S EEE qq')
 *  => 2023-03-23 15:30:59:60 星期四 01
*/
export const formatDate = (date?: string | number | Date, fmt?: string): string => {
  if(date === void 0) date = new Date();
  if(fmt === void 0) fmt = 'yyyy-MM-dd HH:mm:ss';
  if(typeof date === 'string') {
    date = new Date(date);
  } else if(typeof date === 'number') {
    date = new Date(date);
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  const week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  };
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  if(/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? '\u661f\u671f'
          : '\u5468'
        : '') + week[date.getDay() + '' as keyof typeof week]
    );
  }
  for(const k in o) {
    if(new RegExp('(' + k + ')').test(fmt)) {
      type O = keyof typeof o

      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k as O] as unknown as string
          : ('00' + o[k as O]).substr(('' + o[k as O]).length)
      );
    }
  }
  return fmt;
};

/**
 * 手写的时间格式化函数
 * @param date 任何格式的时间
 * @param fmt yyyy-MM-dd hh:mm:ss
 * @returns fmt
 */
export function timeFormat(date: any, fmt: string = 'yyyy-MM-dd hh:mm:ss') {
  if(typeof date === 'string') {
    date = date.replace(/-/g, '/');
  }
  if(!isDate(date)) {
    date = new Date(date);
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S+': date.getMilliseconds() // 毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for(const k in o) {
    if(new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}

export function isDate(obj: unknown) {
  const type = obj === null ? String(obj) : {}.toString.call(obj) || 'object';
  return type === '[object date]';
}

/**
 * 获取几天后是几月几日
 * @param {number} AddDayCount 几天后
 * @returns string
 */
export function GetDateStr(AddDayCount: number) {
  const dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount);
  const y = dd.getFullYear();
  const m =
    dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1;
  const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
  return y + '年' + m + '月' + d + '日';
}

/**
 * dayjs格式化时间
 * @param date 任何格式的时间
 * @param fmt YYYY-MM-DD HH:mm:ss (注意与timeFormat区别)
 * @returns fmt
 */
export function formatDateDay(date: any, fmt = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(fmt);
}
