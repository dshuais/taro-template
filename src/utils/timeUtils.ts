/*
 * @Author: dushuai
 * @Date: 2024-07-30 22:03:50
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-02 21:10:10
 * @Description: 描述
 */
import dayjs from './dayjs'

/**
 * 手写的时间格式化函数
 * @param date 任何格式的时间
 * @param fmt yyyy-MM-dd hh:mm:ss
 * @returns fmt
 */
export function timeFormat(date: any, fmt: string = 'yyyy-MM-dd hh:mm:ss') {
  if (typeof date === 'string') {
    date = date.replace(/-/g, '/');
  }
  if (!isDate(date)) {
    date = new Date(date);
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S+': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k]
          : ('00' + o[k]).substr(('' + o[k]).length)
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
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount);
  var y = dd.getFullYear();
  var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
  var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
  return y + '年' + m + '月' + d + '日';
};

/**
 * dayjs格式化时间
 * @param date 任何格式的时间
 * @param fmt YYYY-MM-DD HH:mm:ss (注意与timeFormat区别)
 * @returns fmt
 */
export function formatDate(date: any, fmt = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(fmt);
}