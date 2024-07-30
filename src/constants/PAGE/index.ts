import { PageModule } from "./modules";
import { SUB_PAGE_TOOL_APPS, TOOL_PAGE_LIST } from "./subpackages";
import { preloadRule } from "./preloadRule";

/** 主包页面PAGE */
export const MAIN_PAGE = {
  /** 首页 */
  HOME: "/pages/home/index",
  /** 个人中心 */
  PERSONAL: "/pages/personal/index",
};

/** 所有页面键值对 */
export const PAGE = Object.assign(
  {},
  MAIN_PAGE,
  SUB_PAGE_TOOL_APPS as PageModule
);

/** 主包页面List */
export const PAGE_LIST = Object.values(MAIN_PAGE).map((path) => path.slice(1));

/** 所有分包 */
export const SUB_PACKAGES = TOOL_PAGE_LIST;

/** 分包预加载规则 */
export const PRELOAD_RULE = preloadRule;
