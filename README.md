<!--
 * @Author: dushuai
 * @Date: 2024-07-30 22:03:50
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-04 12:23:14
 * @Description: readme
-->
# Taro-template

一个自用的Taro开发小程序、H5的项目模板，主要为了减少每次项目开发前的重复操作。主要采用 Taro + React + TypeScript + Webpack + Tailwind css + Zustand + ahooks + Taro-ui 等技术栈和Taro常用库构建。

## 主要功能

- [x] 统一管理的路由、分包、分包预加载系统
- [x] 完善的 Axios Api管理规范
- [x] 区分环境变量
- [x] Zustand 状态管理仓库
- [x] 常用Utils、Hooks和常用wechat api封装
- [x] 常用组件
- [x] 自定义tabbar封装

## 安装

```bash
pnpm create keepdesign

# 选择 taro-template

pnpm i
```

## 运行

```bash
pnpm dev:weapp
```

## 打包

```bash
# 测试环境 对应环境变量.env.test
pnpm build:weapp:test

# or

# 生产
pnpm build:weapp
```
## 技术栈

主要采用 Taro + React + TypeScript + Tailwind css + Zustand + ahooks + Taro-ui + @tarojs/plugin-http + @tarojs/plugin-html + axios + qs + dayjs + classnames 等技术栈和常用库构建

- [Taro](https://docs.taro.zone/docs/)
- [React](https://react.dev/)
- [Tailwindcss](https://www.tailwindcss.cn/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [ahooks](https://ahooks.js.org/zh-CN)
- [Taro-ui](https://taro-ui.jd.com/#/)
