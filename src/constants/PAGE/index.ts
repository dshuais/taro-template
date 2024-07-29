import { SUB_PAGE_TOOL_APPS, TOOL_PAGE_LIST } from "./subpackages";
import { preloadRule } from './preloadRule';

/** 主包页面PAGE */
const PAGE_PATH = {
  HOME: '/pages/home/index',
  // 我的
  PERSONAL: '/pages/personal/index'
};

/** 所有页面键值对 */
export const PAGE = Object.assign({}, PAGE_PATH, SUB_PAGE_TOOL_APPS);

/** 主包页面List */
export const PAGE_LIST = Object.values(PAGE_PATH).map(path => path.slice(1));

/** 所有分包 */
export const SUB_PACKAGES = TOOL_PAGE_LIST;

/** 分包预加载规则 */
export const PRELOAD_RULE = preloadRule;
