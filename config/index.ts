import { defineConfig, type UserConfigExport } from '@tarojs/cli';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { UnifiedWebpackPluginV5 } from 'weapp-tailwindcss/webpack';
import devConfig from './dev';
import prodConfig from './prod';

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { mode }) => {

  // const isProd = mode === 'production';
  const isDev = mode === 'development';
  // const isTest = mode === 'test';

  const baseConfig: UserConfigExport = {
    projectName: 'taro-app',
    date: '2024-4-23',
    // designWidth: 750, // 设计稿750
    designWidth(input: any) {
      // 配置 NutUI 375 尺寸
      if(input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375;
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750;
    },

    // 设计稿转换规则
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },

    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [
      '@tarojs/plugin-http',
      ['@tarojs/plugin-html', {
        // 包含 `demo-`、`van-` 的类名选择器中的 px 单位不会被解析
        pxtransformBlackList: [/demo-/, /van-/]
      }]
    ],
    defineConstants: {
      LOCATION_APIKEY: JSON.stringify('U4MBZ-3U3OQ-AHF5G-BNXOC-IKJ3O-FFFOJ')
    },
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: 'react',
    compiler: 'webpack5',

    // 开启cache持久化缓存
    cache: {
      enable: true // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },

    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {

          }
        },
        url: {
          enable: true,
          config: {
            limit: 1024 // 设定转换尺寸上限
          }
        },
        optimizeMainPackage: {
          enable: true,
          exclude: []
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);

        chain.merge({
          performance: {
            maxEntrypointSize: 1024 * 1024 * 2,
            maxAssetSize: 1024 * 1024 * 2
          }
        });

        chain.merge({
          plugin: {
            install: {
              plugin: UnifiedWebpackPluginV5,
              args: [
                {
                  appType: 'taro',
                  rem2rpx: true // 代替了postcssconfig内的postcss-rem-to-responsive-pixel插件
                }
              ]
            }
          }
        });
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  };
  if(isDev) { // process.env.NODE_ENV === 'development'
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
