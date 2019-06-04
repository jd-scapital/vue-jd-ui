import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import VueJDUI from '../../src'
import 'vue-jd-ui/lib/theme-chalk/index.css'

import './assets/scss/index.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueJDUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
