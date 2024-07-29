import { Plugins, SubPackage } from "@tarojs/taro";
import { packages } from "./modules";

type PACKAGE = typeof packages[keyof typeof packages] & 
  {
    appType?: string,
    plugins?: Plugins,
    independent?: boolean
  };

export const SUB_PAGE_TOOL_APPS: PACKAGE['page'] | {} = {};
export const TOOL_PAGE_LIST: SubPackage[] = [];

Object.keys(packages).forEach(key => {
  const packageRow: PACKAGE = packages[key];
  const pages = Object.keys(packageRow.page).map(page => {
    let suffix = packageRow.page[page];
    const o = Object.assign(SUB_PAGE_TOOL_APPS, { [page]: packageRow.root + suffix }) as PACKAGE['page'];
    Object.assign(SUB_PAGE_TOOL_APPS, o);
    return suffix.slice(1);
  });

  TOOL_PAGE_LIST.push({
    root: packageRow.root.slice(1),
    name: packageRow.name,
    pages,
    plugins: packageRow.plugins,
    independent: packageRow.independent || false  // 是否是独立分包
  })
});
