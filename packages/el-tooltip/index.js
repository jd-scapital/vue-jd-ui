import ElTooltip from './src/main'

/* istanbul ignore next */
ElTooltip.install = function(Vue) {
  Vue.component(ElTooltip.name, ElTooltip)
}

export default ElTooltip
