const os = require('os')
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin') // Gzip

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV !== 'production'

module.exports = {
  publicPath: 'vue-jd-ui/',
  lintOnSave: isProd,
  // 多核编译构建
  parallel: os.cpus().length > 1,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: true,
    // css-modules: https://vue-loader.vuejs.org/zh/guide/css-modules.html#%E7%94%A8%E6%B3%95
    modules: false,
    loaderOptions: {
      css: {
        // 自定义生成的类名
        localIdentName: '[name]-[hash]',
        camelCase: 'only'
      },
      // 配置全局scss
      sass: {
        data: '@import "~@/examples/src/assets/scss/color.scss";@import "~@/packages/theme-chalk/src/base.scss";'
      }
    }
  },
  chainWebpack: config => {
    // 1.设置别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      // packages/theme-chalk/src
      .set('@', resolve('../'))
      // '@': path.resolve(__dirname, '../packages/theme-chalk/src'),
    // console.log('config.resolve.alias: ', config.resolve.alias)

    // 2.调试用, 增加include, babel转换
    config.module.rule('compile')
      .test(/\.js$/)
      .include
      .add(resolve('src'))
      .add(resolve('node_modules/vue-jd-ui/packages/el-scrollbar'))
      .add(resolve('node_modules/vue-jd-ui/packages/el-tooltip'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .options({
        presets: [
          ['@babel/preset-env', {
            modules: false
          }]
        ]
      })
    // 3.增加md解析
    config.module.rule('markdown')
      .test(/\.md$/)
      .use('text')
      .loader('text-loader')
  },
  configureWebpack: config => {
    const productPlugins = isProd
      ? [
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          // gzip bigger than 8kb files
          threshold: 1024 * 8,
          minRatio: 0.8
        })
      ]
      : []
    // 1.gzip compress
    config.plugins = [
      // my own plugins list
      ...productPlugins,
      ...config.plugins
    ]
  }
}
