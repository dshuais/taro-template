import Taro from '@tarojs/taro';

let ispay = false;

/**
 * 微信支付
 */
export function requestPayment(result: any) {
  if(ispay) return;
  ispay = true;
  return new Promise<string>((resolve, reject) => {
    try {
      Taro.requestPayment({
        // appid: result.appid,
        // provider: 'wxpay',
        timeStamp: `${result.timestamp}`,
        nonceStr: result.nonce_str,
        package: result.package_str,
        signType: 'MD5',
        paySign: result.sign,
        success() {
          ispay = false;
          resolve('success');
        },
        fail(_err) {
          ispay = false;
          reject('fail');
        },
        complete: () => {
          resolve('complete');
          ispay = false;
        }
      });
    } catch(e) {
      ispay = false;
    }
  });
}
