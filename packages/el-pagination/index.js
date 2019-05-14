import ElPagination from './src/pagination'

/* istanbul ignore next */
ElPagination.install = function(Vue) {
  Vue.component(ElPagination.name, ElPagination)
}

export default ElPagination
