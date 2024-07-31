import Taro from "@tarojs/taro";
import { APP_VERSION } from '@/constants/common';

/** 获取系统信息 */
export function getSystemInfo(){
  const systemInfo = Taro.getSystemInfoSync();
  // 导航栏高度
  let rect: any = null; //胶囊按钮位置信息
  try {
    rect = Taro.getMenuButtonBoundingClientRect ? Taro.getMenuButtonBoundingClientRect() : null;
    if (rect === null) {
      throw 'getMenuButtonBoundingClientRect error';
    }
    //取值为0的情况
    if (!rect.width) {
      throw 'getMenuButtonBoundingClientRect error';
    }
  } catch (error) {
    let gap = 0; // 胶囊按钮上下间距 使导航内容居中
    let width = 96; // 胶囊的宽度，android大部分96，ios为88
    if (systemInfo.platform === 'android') {
      gap = 8;
      width = 96;
    } else if (systemInfo.platform === 'devtools') {
      if (`${systemInfo.system}`.toLowerCase().includes('ios')) {
        gap = 5.5; // 开发工具中ios手机
      } else {
        gap = 7.5; // 开发工具中android和其他手机
      }
    } else {
      gap = 4;
      width = 88;
    }
    if (!systemInfo.statusBarHeight) {
      // 开启wifi的情况下修复statusBarHeight值获取不到
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
    }
    rect = {
      // 获取不到胶囊信息就自定义重置一个
      bottom: systemInfo.statusBarHeight + gap + 32,
      height: 32,
      left: systemInfo.windowWidth - width - 10,
      right: systemInfo.windowWidth - 10,
      top: systemInfo.statusBarHeight + gap,
      width: width
    };
  }
  let gap = rect.top - systemInfo.statusBarHeight!; // 动态计算每台手机状态栏到胶囊按钮间距
  const navBarHeight = 2 * gap + rect.height;
  const safeTopDistance = rect.bottom;
  const systemText = `${systemInfo.system}`.toLowerCase();
  return {
    ...systemInfo,
    navBarHeight,
    safeTopDistance,
    headerHeight: systemInfo.statusBarHeight + navBarHeight,
    isIOS: systemText.includes('ios') || systemText.includes('mac'),
    rect
  };
}

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
export function debounceFn(func: Function, delay = 100) {
  let timer: any;
  return (...args: any) => {
    // 当delay等于0时，取消debounce，改为同步执行该方法
    if (delay === 0) {
      return func(...args);
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * 节流throttle
 * @param func 
 * @param delay 
 */
export function throttle(func: Function, delay = 100) {
  let canRun = true;
  return (...args: any) => {
    // 在函数开头判断标记是否为true，不为true则return
    if (!canRun) return;
    canRun = false;
    func(...args);
    setTimeout(() => {
      canRun = true;
    }, delay);
  };
};

export function params2json(params = '', slice = '&') {
  const result = {};
  params.split(slice).forEach((item) => {
    let arr = item.split('=');
    const key = arr[0] || '', value = arr[1] || '';
    if (item && key) {
      result[key] = value;
    }
  });
  return result;
}

export function json2params(json = {}, slice = '&') {
  return Object.keys(json).reduce((acc, item) => {
    return acc + '' + item + '=' + json[item] + slice;
  }, '').slice(0, -1);
}

// 判断数据是否为空，多用于数组和对象的判断
export function isNotEmpty(value: unknown) {
  switch (typeof (value)) {
    case 'undefined': {
      return false;
    }

    case 'string': {
      return value.length !== 0;
    }

    case 'object': {
      if (Array.isArray(value)) {
        return value.length !== 0;
      } else if (value === null) {
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
export function assignNoEmpty(...args: {}[]): {} {
  /* @ts-ignore */
  const object = Object.assign(...args);
  return Object.keys(object).reduce((obj, key) => {
    const value = object[key];
    if (isNotEmpty(value) && value !== 'undefined') {
      obj[key] = value;
    }
    return obj;
  }, {});
}

/** 将查询对象转换为查询字符串 */
export function query2search(query = {}) {
  let queryStr = '';
  const filteredQuery = assignNoEmpty(query);
  if (isNotEmpty(filteredQuery)) {
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
  let tempQuery = assignNoEmpty(Object.assign({}, params2json(queryStr), assignNoEmpty(params)));
  let searchQuery = query2search(tempQuery);
  return padSlash ? `${padSlashFn(pathname)}${searchQuery}` : `${pathname}${searchQuery}`;
}

/**
 * decode处理 url
 * @param {String} url 源链接 http:// | https:// | / 开头
 */
export function decodeUrl(url: string = '') {
  if (url && ((url.indexOf('%3A%2F%2F') > -1 && url.indexOf('%3A%2F%2F') < 6) || url.startsWith('%2F'))) {
    return decodeURIComponent(url);
  }
  return url;
}

/** 拼接查询参数 */
export function padQuerys(url = '', params = {}, padSlash = true) {
  const newUrl = decodeUrl(url);
  const [pathname, queryStr] = newUrl.split('?');
  let tempQuery = assignNoEmpty(Object.assign({}, params2json(queryStr), assignNoEmpty(params)));
  let searchQuery = query2search(tempQuery);
  return padSlash ? `${padSlashFn(pathname)}${searchQuery}` : `${pathname}${searchQuery}`;
}

export function iosNotSupportToast(complete: any) {
  const { descr = '', service2Customer } = getVersionInfo();
  if(service2Customer) {
    const text = descr.trim() || '因政策规定，iOS功能暂不可用';
    Taro.showToast({
      title: text,
      icon: 'none',
      complete: complete
    });
  }
}

export function getVersionInfo() {
  const sysInfo = getSystemInfo();
  let versionInfo = Taro.getStorageSync(APP_VERSION) || {};
  const { emergencyStatus, androidEmergency, iosUseBackUp } = versionInfo;
  let showEmergency = sysInfo.isIOS ? emergencyStatus : androidEmergency;
  // 小程序申诉中
  let isAppeal = !(Number(showEmergency) === 0);
  // 申诉审核隐藏违规手机号授权
  let hiddenPhone = (Number(iosUseBackUp) !== 1);
  return Object.assign({}, versionInfo, {
    /** ios，且开启了“客服打开流程” */
    service2Customer: sysInfo.isIOS && isAppeal,
    isAppeal,
    appealText: isAppeal ? '因政策规定，IOS功能暂不可用' : '',
    hiddenPhone
  });
}

/** 生成16位随机数 */
export const randomStr = (length = 16) => {
  const RAND_ARR = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  return new Array(length).fill(1).map(() => {
    return RAND_ARR[Math.floor(Math.random() * (RAND_ARR.length - 1))];
  }).join('');
};

export function getWeekTime(date: number | string | Date) {
  let new_Date = new Date(date || new Date()); //获取本周一周日期
  let timesStamp = new_Date.getTime();
  let currenDay = new_Date.getDay();
  let dates: string[] = [];
  for(let i = 0; i < 7; i++) {
    let das = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString();
    das = das.replace(/\//g, '-');
    dates.push(das);
  }
  return dates;
}

// 格式化资源时间
export const timeFormat = (time = 0) => {
  let hours: number, minutes: string | number, seconds: string | number;
  let intTime = Math.floor(time);
  hours = Math.floor(intTime / 3600);
  minutes = Math.floor(intTime / 60 % 60);
  seconds = intTime % 60;
  return {
    hours: hours,
    minutes: (minutes > 9) ? minutes : '0' + minutes,
    seconds: (seconds > 9) ? seconds : '0' + seconds
  };
};

// 距离顶部距离
export const computedTopHeight = (num: number) => {
  const { statusBarHeight, navBarHeight } = getSystemInfo();
  return statusBarHeight + navBarHeight + rpx2px(num);
};

// 定义全局对象属性
export function defineAppProperty(key: PropertyKey, value: any, writable = false) {
  if(key in Taro.getApp() && !writable) return;
  return Object.defineProperty(Taro.getApp(), key, {
    writable,
    value
  });
}

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
 * 拼接classname
 * @param  {...any} args
 */
export function classNames(...args: any[]) {
  const classnames = args.filter((name) => !!name);
  return classnames.map(name => {
    if(isObject(name)) {
      const temps: string[] = [];
      Object.keys(name).forEach(v => {
        if(name[v]) {
          temps.push(v);
        }
      });
      name = temps.join(' ');
    }
    return name;
  }).join(' ');
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone<T>(source: T): T {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments deepClone')
  }
  const targetObj = (source!.constructor === Array ? [] : {}) as T

  Object.keys(source!).forEach(keys => {
    type K = keyof typeof source
    if (source![keys as K] && typeof source![keys as K] === 'object') {
      targetObj[keys as K] = deepClone(source![keys as K])
    } else {
      targetObj[keys as K] = source![keys as K]
    }
  })

  return targetObj
}

/**
 * 复制方法
 * @param {string} text 要复制的内容
 * @param {boolean} origin 通过什么类型复制 input:false复制内容在一行 textarea:true可换行 可选，默认textarea
 * @returns {Promise<boolean>} 是否复制成功
 */
export const $copy = (text: string, origin: boolean = true): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    let input: HTMLInputElement | HTMLTextAreaElement
    if (origin) input = document.createElement('textarea')
    else input = document.createElement('input')

    input.setAttribute('readonly', 'readonly')
    input.value = text
    document.body.appendChild(input)
    input.select()
    if (document.execCommand('copy')) {
      document.execCommand('copy')
      resolve(true)
    } else {
      reject(false)
    }
    document.body.removeChild(input)
  })
}
