import Taro from "@tarojs/taro";

/**
 * 手动重写persist storage .
 * storage to use for state persistence, defaults to localStorage for web
 * @returns 
 */
export const sessionStorage = () => ({
  getItem: (name: string) => Taro.getStorageSync(name),

  setItem: (name: string, value: any) => Taro.setStorageSync(name, value),

  removeItem: (name: string) => Taro.removeStorageSync(name),
});
