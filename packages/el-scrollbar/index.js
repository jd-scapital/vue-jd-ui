import ElScrollbar from './src/main'

/* istanbul ignore next */
ElScrollbar.install = function(Vue) {
  Vue.component(ElScrollbar.name, ElScrollbar)
}

export default ElScrollbar
