import login from './login';
import detail from './detail';

/** 开发模式才使用这个，打包记得清空（只需加载的包名，方便开发功能，不填则为所有） */
export const loadPackageNames: string[] = [];

let packs = {
  login,
  detail
};

if(loadPackageNames.length) {
  // @ts-ignore
  packs = Object.keys(packs).filter(key => loadPackageNames.includes(key))
  .map(prop => packs[prop]);
}

/** 所有分包 */
export const packages = packs;
