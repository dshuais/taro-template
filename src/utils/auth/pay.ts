import Taro from '@tarojs/taro';

/**
 * 微信支付
 */
export function requestPayment(params: any) {
  return new Promise<string>((resolve, reject) => {
    try {
      const { timeStamp, nonceStr, package_str, paySign } = params;
      Taro.requestPayment({
        timeStamp,
        nonceStr,
        package: package_str,
        signType: 'MD5',
        paySign,
        success() {
          resolve('success');
        },
        fail(_err) {
          console.warn('requestPayment fail:>> ', _err);
          reject('fail');
        },
        complete: () => {
          resolve('complete');
        }
      });
    } catch(_err) {
      console.warn('requestPayment error:>> ', _err);
      reject('catch');
    }
  });
}
