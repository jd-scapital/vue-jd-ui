import ElSelect from './src/select'

/* istanbul ignore next */
ElSelect.install = function(Vue) {
  Vue.component(ElSelect.name, ElSelect)
}

export default ElSelect
