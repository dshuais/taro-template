import { PageModule } from './modules';
import { SUB_PAGE_TOOL_APPS, TOOL_PAGE_LIST } from './subpackages';
import { preloadRule } from './preloadRule';

/** TABBAR_PAGE */
export const TABBAR_PAGE = {
  /** 首页 */
  HOME: '/pages/home/index',
  /** 个人中心 */
  PERSONAL: '/pages/personal/index'
};

/** 主包页面PAGE */
export const MAIN_PAGE = {
  ...TABBAR_PAGE
};

/** 所有页面键值对 */
export const PAGE = Object.assign(
  {},
  MAIN_PAGE,
  SUB_PAGE_TOOL_APPS as PageModule
);

/** 主包页面List */
export const PAGE_LIST = Object.values(MAIN_PAGE).map((path) => path.slice(1));

/** 除主包外所有页面 */
export const SUB_PAGE = SUB_PAGE_TOOL_APPS as PageModule;

/** 所有分包 */
export const SUB_PACKAGES = TOOL_PAGE_LIST;

/** 分包预加载规则 */
export const PRELOAD_RULE = preloadRule;

export const TAB_BAR_LIST: App.Tabbar[] = [
  {
    key: 'home',
    pagePath: TABBAR_PAGE.HOME,
    text: '首页',
    iconPath: 'https://oss.5rs.me/oss/uploadfe/png/ecbef6cdea2102e6b1f07e5431cb0bfe.png',
    selectedIconPath: 'https://oss.5rs.me/oss/uploadfe/png/455a3001c65e23ecc0e5cf09c736f17e.png'
  },
  {
    key: 'my',
    pagePath: TABBAR_PAGE.PERSONAL,
    text: '我的',
    iconPath: 'https://oss.5rs.me/oss/uploadfe/png/48bde7aa78574e44977a6e0a6dc052ba.png',
    selectedIconPath: 'https://oss.5rs.me/oss/uploadfe/png/46868f5136f2d80225a3fa3b94b620af.png'
  }
];
