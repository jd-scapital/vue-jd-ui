import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前menu
    menu: '',
    // 默认菜单
    defaultMenu: ''
  },
  getters: {
    menu: state => state.menu,
    defaultMenu: state => state.defaultMenu
  },
  actions: {
    setMenu({ commit }, payload) {
      commit('SET_MENU', payload)
    },
    setDefaultMenu({ commit }, payload) {
      commit('SET_DEFAULT_MENU', payload)
    }
  },
  mutations: {
    SET_MENU(state, payload) {
      state.menu = payload
    },
    SET_DEFAULT_MENU(state, payload) {
      state.defaultMenu = payload
    }
  }
})
