import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import VueJDUI from '../../src'
// import 'vue-jd-ui/lib/theme-chalk/index.css'
// import '../../packages/theme-chalk/src/index.scss'

import './assets/scss/index.scss'

const isProd = process.env.NODE_ENV === 'production'
if (isProd) {
  require('vue-jd-ui/lib/theme-chalk/index.css')
}
else {
  require('../../packages/theme-chalk/src/index.scss')
}

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueJDUI)

Vue.component('collapse-transition', CollapseTransition)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
