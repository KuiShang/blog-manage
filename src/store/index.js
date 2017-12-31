import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  user: {},
  token: ''
}
const mutations = {
  saveUser (state, user) {
    state.user = user
  }
}

const actions = {
  saveUser ({ commit }, user) {
    commit('saveUser', user)
  }
}
const getters = {}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
