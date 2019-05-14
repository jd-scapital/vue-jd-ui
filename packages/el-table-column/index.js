import ElTableColumn from '../el-table/src/table-column'

/* istanbul ignore next */
ElTableColumn.install = function(Vue) {
  Vue.component(ElTableColumn.name, ElTableColumn)
}

export default ElTableColumn
