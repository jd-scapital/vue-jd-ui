import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前menu
    menu: ''
  },
  getters: {
    menu: state => state.menu
  },
  actions: {
    setMenu({ commit }, payload) {
      commit('SET_MENU', payload)
    }
  },
  mutations: {
    SET_MENU(state, payload) {
      state.menu = payload
    }
  }
})
