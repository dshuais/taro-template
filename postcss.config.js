/*
 * @Author: dushuai
 * @Date: 2024-08-01 20:58:06
 * @LastEditors: dushuai
 * @LastEditTime: 2024-08-01 21:02:51
 * @Description: 描述
 */
// postcss 插件是 object 方式注册的话，是按照由上到下的顺序执行的，相关实现见 postcss-load-config
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-rem-to-responsive-pixel': {
      // 32 意味着 1rem = 32rpx
      rootValue: 32,
      // 默认所有属性都转化
      propList: ['*'],
      // 转化的单位,可以变成 px / rpx
      transformUnit: 'rpx'
    }
  }
}
