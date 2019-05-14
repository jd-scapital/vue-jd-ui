var path = require('path')
var fs = require('fs')
var nodeExternals = require('webpack-node-externals')
var Components = require('../components.json')
var saladConfig = require('./salad.config.json')

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'))
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'))
var transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'))
var externals = {}

Object.keys(Components).forEach(function(key) {
  externals[`jd-ui/packages/${key}`] = `jd-ui/lib/${key}`
})

externals['jd-ui/src/locale'] = 'jd-ui/lib/locale'
utilsList.forEach(function(file) {
  file = path.basename(file, '.js')
  externals[`jd-ui/src/utils/${file}`] = `jd-ui/lib/utils/${file}`
})
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js')
  externals[`jd-ui/src/mixins/${file}`] = `jd-ui/lib/mixins/${file}`
})
transitionList.forEach(function(file) {
  file = path.basename(file, '.js')
  externals[`jd-ui/src/transitions/${file}`] = `jd-ui/lib/transitions/${file}`
})

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()]

exports.externals = externals

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  'jd-ui': path.resolve(__dirname, '../')
}

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date.\js/

exports.postcss = function(webapck) {
  saladConfig.features.partialImport = {
    addDependencyTo: webapck
  }
  return [
    require('postcss-salad')(saladConfig)
  ]
}
