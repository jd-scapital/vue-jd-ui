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
  externals[`vue-jd-ui/packages/${key}`] = `vue-jd-ui/lib/${key}`
})

externals['vue-jd-ui/src/locale'] = 'vue-jd-ui/lib/locale'
utilsList.forEach(function(file) {
  file = path.basename(file, '.js')
  externals[`vue-jd-ui/src/utils/${file}`] = `vue-jd-ui/lib/utils/${file}`
})
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js')
  externals[`vue-jd-ui/src/mixins/${file}`] = `vue-jd-ui/lib/mixins/${file}`
})
transitionList.forEach(function(file) {
  file = path.basename(file, '.js')
  externals[`vue-jd-ui/src/transitions/${file}`] = `vue-jd-ui/lib/transitions/${file}`
})

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()]

exports.externals = externals

exports.alias = {
  '@@': path.resolve(__dirname, '../packages/theme-chalk/src'),
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  'vue-jd-ui': path.resolve(__dirname, '../')
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
