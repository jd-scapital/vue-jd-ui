var fs = require('fs')
var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const entry = {}
let files = fs.readdirSync(path.resolve(__dirname, '../src/js'))
// files = files.filter(f => !~f.indexOf('.js'))
files = files.map(f => ({ [f.replace('.js', '')]: path.resolve(__dirname, `../src/js/${f}`) }))
files.forEach(file => {
  Object.keys(file).forEach(f => {
    entry[f] = file[f]
  })
})

// console.log('entry: ', entry)

module.exports = {
  mode: 'production',
  entry: entry,
  output: {
    filename: '[name].css',
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      '@': path.resolve(__dirname, '../../../')
    }
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
      filename: './[name].css',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: './src/fonts', to: './fonts' }
    ])
  ]
}
