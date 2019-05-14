import ElOption from '../el-select/src/option'

/* istanbul ignore next */
ElOption.install = function(Vue) {
  Vue.component(ElOption.name, ElOption)
}

export default ElOption
