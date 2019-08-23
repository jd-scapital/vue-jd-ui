const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = require('./config')

module.exports = {
  mode: 'production',
  entry: {
    index: ['./src/index.js']
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/',
    filename: 'vue-jd-ui.common.js',
    chunkFilename: '[id].js',
    libraryExport: 'default',
    library: 'JDUI',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  externals: config.externals,
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
          loaders: {
            css: ExtractTextPlugin.extract({
              use: [
                'css-loader',
                'sass-loader'
              ],
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader'
          ]
        })
        // loaders: ['style-loader', 'css-loader']
      }
      // {
      //   test: /\.scss$/,
      //   loader: ExtractTextPlugin.extract({
      //     fallback: 'vue-style-loader',
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           importLoaders: 1
      //         }
      //       },
      //       'postcss-loader',
      //       'sass-loader',
      //       {
      //         loader: 'sass-resources-loader',
      //         options: {
      //           resources: path.resolve(__dirname, '../packages/theme-chalk/src/base.scss')
      //         }
      //       }
      //     ]
      //   })
      // },
      // {
      //   test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 10000,
      //     name: path.posix.join('fonts', '[name].[ext]')
      //   }
      // }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
    // new ExtractTextPlugin({
    //   filename: 'theme-chalk/[name].css',
    //   allChunks: true
    // })
  ]
}
