import ElPagination from './src/pagination'
import Locale from 'vue-jd-ui/src/mixins/locale'
import zhLocale from 'vue-jd-ui/src/locale/lang/zh-CN'
zhLocale.el.pagination.goto = '跳至 '

/* istanbul ignore next */
ElPagination.install = function(Vue) {
  Locale.use(zhLocale)
  Vue.component(ElPagination.name, ElPagination)
}

export default ElPagination
