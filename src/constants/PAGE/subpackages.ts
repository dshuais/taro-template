import { Plugins, SubPackage } from '@tarojs/taro';
import { packages, Pack } from './modules';

type PACKAGE = Pack & {
  appType?: string;
  plugins?: Plugins;
  independent?: boolean;
};

export const SUB_PAGE_TOOL_APPS = {};
export const TOOL_PAGE_LIST: SubPackage[] = [];

Object.keys(packages).forEach((key) => {
  const packageRow: PACKAGE = packages[key];
  const pages = Object.keys(packageRow.page).map((page) => {
    const suffix = packageRow.page[page];
    // Object.assign(SUB_PAGE_TOOL_APPS, { [page]: packageRow.root + suffix }); // 造成编译错误
    SUB_PAGE_TOOL_APPS[page] = packageRow.root + suffix;
    return suffix.slice(1);
  });

  TOOL_PAGE_LIST.push({
    root: packageRow.root.slice(1),
    name: packageRow.name,
    pages,
    plugins: packageRow.plugins,
    independent: packageRow.independent || false // 是否是独立分包
  });
});
