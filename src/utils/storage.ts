
import Taro from '@tarojs/taro';

const Storage = {
  set(key: any, value: any) {
    return Taro.setStorage({ key, data: value });
  },

  setSync(key: string, value: any) {
    return Taro.setStorageSync(key, value);
  },

  get(key: any) {
    return Taro.getStorage({ key })
      .then((res) => res.data || '')
      .catch(() => '');
  },

  getSync(key: string) {
    return Taro.getStorageSync(key) || '';
  },

  remove(key: any) {
    return Taro.removeStorage({ key })
      .catch(() => '');
  },

  removeSync(key: string) {
    return Taro.removeStorageSync(key);
  },

  clearStorage() {
    return Taro.clearStorage();
  },

  clearStorageSync() {
    return Taro.clearStorageSync();
  }
};

export default Storage;
