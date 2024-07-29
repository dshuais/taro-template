import dayjs from './dayjs'

export function timeFormat({ date, fmt }){
  if(typeof date === 'string'){
    date = date.replace(/-/g, '/');
  }
  if(!isDate(date)){
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

export function isDate(obj: null){
  const type = obj === null ? String(obj) : {}.toString.call(obj) || 'object';
  return type === '[object date]';
}

export function GetDateStr(AddDayCount: number) {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount);
  var y = dd.getFullYear();
  var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
  var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
  return y + '年' + m + '月' + d + '日';
};

export function formatDate(date: string | number | Date | dayjs.Dayjs | null | undefined, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}