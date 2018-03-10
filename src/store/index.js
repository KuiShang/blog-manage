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
  },
  saveTags (state, tags) {
    state.tags = tags
  }
}

const actions = {
  saveUser ({ commit }, user) {
    commit('saveUser', user)
  }
}
const getters = {
  catalogs: state => state.catalogs,
  tags: state => state.tags
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
