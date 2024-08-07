import Taro from '@tarojs/taro';
import { APP_VERSION } from '@/constants/common';
import { isObject, rpx2px } from './utils';

/** 获取系统信息 */
export function getSystemInfo() {
  const systemInfo = Taro.getSystemInfoSync();
  // 导航栏高度
  let rect: any = null; //胶囊按钮位置信息
  try {
    rect = Taro.getMenuButtonBoundingClientRect
      ? Taro.getMenuButtonBoundingClientRect()
      : null;
    if(rect === null) {
      throw 'getMenuButtonBoundingClientRect error';
    }
    //取值为0的情况
    if(!rect.width) {
      throw 'getMenuButtonBoundingClientRect error';
    }
  } catch(error) {
    let gap = 0; // 胶囊按钮上下间距 使导航内容居中
    let width = 96; // 胶囊的宽度，android大部分96，ios为88
    if(systemInfo.platform === 'android') {
      gap = 8;
      width = 96;
    } else if(systemInfo.platform === 'devtools') {
      if(`${systemInfo.system}`.toLowerCase().includes('ios')) {
        gap = 5.5; // 开发工具中ios手机
      } else {
        gap = 7.5; // 开发工具中android和其他手机
      }
    } else {
      gap = 4;
      width = 88;
    }
    if(!systemInfo.statusBarHeight) {
      // 开启wifi的情况下修复statusBarHeight值获取不到
      systemInfo.statusBarHeight =
        systemInfo.screenHeight - systemInfo.windowHeight - 20;
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
  const gap = rect.top - systemInfo.statusBarHeight!; // 动态计算每台手机状态栏到胶囊按钮间距
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

// 距离顶部距离
export const computedTopHeight = (num: number) => {
  const { statusBarHeight, navBarHeight } = getSystemInfo();
  return statusBarHeight + navBarHeight + rpx2px(num);
};

// 定义全局对象属性
export function defineAppProperty(
  key: PropertyKey,
  value: any,
  writable = false
) {
  if(key in Taro.getApp() && !writable) return;
  return Object.defineProperty(Taro.getApp(), key, {
    writable,
    value
  });
}

/**
 * 拼接classname
 * @param  {...any} args
 */
export function classNames(...args: any[]) {
  const classnames = args.filter(name => !!name);
  return classnames
    .map(name => {
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
    })
    .join(' ');
}

export function getVersionInfo() {
  const sysInfo = getSystemInfo();
  const versionInfo = Taro.getStorageSync(APP_VERSION) || {};
  const { emergencyStatus, androidEmergency, iosUseBackUp } = versionInfo;
  const showEmergency = sysInfo.isIOS ? emergencyStatus : androidEmergency;
  // 小程序申诉中
  const isAppeal = !(Number(showEmergency) === 0);
  // 申诉审核隐藏违规手机号授权
  const hiddenPhone = Number(iosUseBackUp) !== 1;
  return Object.assign({}, versionInfo, {
    /** ios，且开启了“客服打开流程” */
    service2Customer: sysInfo.isIOS && isAppeal,
    isAppeal,
    appealText: isAppeal ? '因政策规定，IOS功能暂不可用' : '',
    hiddenPhone
  });
}

