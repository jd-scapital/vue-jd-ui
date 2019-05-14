import Progress from './Progress'

/* istanbul ignore next */
Progress.install = function(Vue) {
  Vue.component(Progress.name, Progress)
}

export default Progress
