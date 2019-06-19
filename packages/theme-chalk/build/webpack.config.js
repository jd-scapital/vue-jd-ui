// var fs = require('fs')
var path = require('path')
// var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// let files = fs.readdirSync(path.resolve(__dirname, './src'))
// files = files.filter(f => !~f.indexOf('.js'))
// files = files.map(f => path.resolve(__dirname, `src/${f}`))
// console.log('files: ', files)

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: '[name].css',
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // filename: '[name].[hash].css',
      filename: './[name].css',
      allChunks: true
    })
    // new CopyWebpackPlugin([
    //   { from: './src/fonts', to: './fonts' }
    // ])
  ]
}
