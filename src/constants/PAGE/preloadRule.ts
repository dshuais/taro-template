import { loadPackageNames } from "./modules";

/**
 * packages 值为 __APP__ 时，加载主包
 */

const RULE = {
  "pages/home/index": {
    network: "all",
    packages: [
      "pagesDetail", // 填写PAGE/modules/对应包的name值也可： 详情页 = pagesDetail
    ],
  },
  "pages/personal/index": {
    network: "all",
    packages: [
      "登录module", // = pagesLogin
    ],
  },
};

/** 分包预加载 */
export const preloadRule = loadPackageNames.length ? {} : RULE;
