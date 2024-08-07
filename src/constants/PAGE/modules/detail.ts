
/**
 * 分包根目录
 */
const root = '/pagesDetail';

/**
 * 分包别名
 */
const name = '详情页';

/**
 * 分包页面路径
 */
const page = {
  /** info页 */
  INFO: '/info/index',

  /** webview */
  WEBVIEW: '/webview/index'
};

export default { root, name, page };

export type DetailPage = typeof page;
