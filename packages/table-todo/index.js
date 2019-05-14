import TodoTable from './TodoTable'

/* istanbul ignore next */
TodoTable.install = function(Vue) {
  Vue.component(TodoTable.name, TodoTable)
}

export default TodoTable
