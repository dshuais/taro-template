import { getSystemInfo } from './tools';

/** rpx 转换为 px */
export function rpx2px(rpx: number) {
  const { screenWidth } = getSystemInfo();
  return rpx * (screenWidth / 750);
}

/** px 转换为 rpx */
export function px2rpx(px: number) {
  const { screenWidth } = getSystemInfo();
  return px * (750 / screenWidth);
}

/**
 * 防抖函数
 * @param func
 * @param delay
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function debounceFn(func: Function, delay = 100) {
  let timer: any;
  return (...args: any) => {
    // 当delay等于0时，取消debounce，改为同步执行该方法
    if(delay === 0) {
      return func(...args);
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * 节流throttle
 * @param func
 * @param delay
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function throttle(func: Function, delay = 100) {
  let canRun = true;
  return (...args: any) => {
    // 在函数开头判断标记是否为true，不为true则return
    if(!canRun) return;
    canRun = false;
    func(...args);
    setTimeout(() => {
      canRun = true;
    }, delay);
  };
}

export function params2json(params = '', slice = '&') {
  const result = {};
  params.split(slice).forEach(item => {
    const arr = item.split('=');
    const key = arr[0] || '',
      value = arr[1] || '';
    if(item && key) {
      result[key] = value;
    }
  });
  return result;
}

export function json2params(json = {}, slice = '&') {
  return Object.keys(json)
    .reduce((acc, item) => {
      return acc + '' + item + '=' + json[item] + slice;
    }, '')
    .slice(0, -1);
}

// 判断数据是否为空，多用于数组和对象的判断
export function isNotEmpty(value: unknown) {
  switch (typeof value) {
    case 'undefined': {
      return false;
    }

    case 'string': {
      return value.length !== 0;
    }

    case 'object': {
      if(Array.isArray(value)) {
        return value.length !== 0;
      } else if(value === null) {
        return false;
      } else {
        return Object.keys(value).length !== 0;
      }
    }

    default: {
      return true;
    }
  }
}

/**
 * 过滤对象中的空属性，使用方法类似于Object.assign
 * @param args
 * @returns {{}}
 */
export function assignNoEmpty(...args: object[]): object {
  const object = Object.assign(...args);
  return Object.keys(object).reduce((obj, key) => {
    const value = object[key];
    if(isNotEmpty(value) && value !== 'undefined') {
      obj[key] = value;
    }
    return obj;
  }, {});
}

/** 将查询对象转换为查询字符串 */
export function query2search(query = {}) {
  let queryStr = '';
  const filteredQuery = assignNoEmpty(query);
  if(isNotEmpty(filteredQuery)) {
    queryStr = '?' + json2params(filteredQuery);
  }
  return queryStr;
}

/**
 * 补充path前的斜杠
 * @param path
 * @returns {string}
 */
export function padSlashFn(path = ''): string {
  return `/${path.replace(/^\//, '')}`;
}

/** 拼接查询参数 */
export function padQuery(url = '', params = {}, padSlash = true) {
  const [pathname, queryStr] = url.split('?');
  const tempQuery = assignNoEmpty(Object.assign({}, params2json(queryStr), assignNoEmpty(params)));
  const searchQuery = query2search(tempQuery);
  return padSlash
    ? `${padSlashFn(pathname)}${searchQuery}`
    : `${pathname}${searchQuery}`;
}

/**
 * decode处理 url
 * @param {String} url 源链接 http:// | https:// | / 开头
 */
export function decodeUrl(url: string = '') {
  if(
    url &&
    ((url.indexOf('%3A%2F%2F') > -1 && url.indexOf('%3A%2F%2F') < 6) ||
      url.startsWith('%2F'))
  ) {
    return decodeURIComponent(url);
  }
  return url;
}

/** 拼接查询参数 */
export function padQuerys(url = '', params = {}, padSlash = true) {
  const newUrl = decodeUrl(url);
  const [pathname, queryStr] = newUrl.split('?');
  const tempQuery = assignNoEmpty(Object.assign({}, params2json(queryStr), assignNoEmpty(params)));
  const searchQuery = query2search(tempQuery);
  return padSlash
    ? `${padSlashFn(pathname)}${searchQuery}`
    : `${pathname}${searchQuery}`;
}

/** 生成16位随机数 */
export const randomStr = (length = 16) => {
  const RAND_ARR = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];
  return new Array(length)
    .fill(1)
    .map(() => {
      return RAND_ARR[Math.floor(Math.random() * (RAND_ARR.length - 1))];
    })
    .join('');
};

export function getWeekTime(date: number | string | Date) {
  const new_Date = new Date(date || new Date()); //获取本周一周日期
  const timesStamp = new_Date.getTime();
  const currenDay = new_Date.getDay();
  const dates: string[] = [];
  for(let i = 0; i < 7; i++) {
    let das = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7))).toLocaleDateString();
    das = das.replace(/\//g, '-');
    dates.push(das);
  }
  return dates;
}

// 格式化资源时间
export const timeFormat = (time = 0) => {
  const intTime = Math.floor(time);
  const hours = Math.floor(intTime / 3600);
  const minutes = Math.floor((intTime / 60) % 60);
  const seconds = intTime % 60;
  return {
    hours: hours,
    minutes: minutes > 9 ? minutes : '0' + minutes,
    seconds: seconds > 9 ? seconds : '0' + seconds
  };
};

export function getEllipsis(str: string, len = 6) {
  if(typeof str === 'string' && str.length > len) {
    return str.slice(0, len) + '...';
  } else {
    return str;
  }
}

export function isObject(temp: any) {
  return Object.prototype.toString.call(temp) === '[object Object]';
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone<T>(source: T): T {
  if(!source && typeof source !== 'object') {
    throw new Error('error arguments deepClone');
  }
  const targetObj = (source!.constructor === Array ? [] : {}) as T;

  Object.keys(source!).forEach(keys => {
    type K = keyof typeof source;
    if(source![keys as K] && typeof source![keys as K] === 'object') {
      targetObj[keys as K] = deepClone(source![keys as K]);
    } else {
      targetObj[keys as K] = source![keys as K];
    }
  });

  return targetObj;
}
