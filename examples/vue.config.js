const os = require('os')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  lintOnSave: process.env.NODE_ENV !== 'production',
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
        // data: `@import "@/assets/scss/index.scss";`
      }
    }
  },
  chainWebpack: config => {
    // 1.设置别名
    // config.resolve.alias
    //   .set('vue-jd-ui', resolve('../'))
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
  }
}
