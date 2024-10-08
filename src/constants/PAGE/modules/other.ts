/*
 * @Author: dushuai
 * @Date: 2024-07-30 22:03:50
 * @LastEditors: dushuai
 * @LastEditTime: 2024-07-31 22:07:46
 * @Description: 登录module
 */

/**
 * 分包根目录
 */
const root = '/pagesOther';

/**
 * 分包别名
 */
const name = '其他module';

/**
 * 分包页面路径
 */
const page = {
  /** 登录页 */
  OTHER: '/other/index'
};

export default { root, name, page };

export type OtherPage = typeof page;
