import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../store/auth'
import questions from '../store/questions'
import users from '../store/users'
import test from '../store/test'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    setError({ commit }, massege) {
      try {

        this.state.error = massege
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  modules: {
    auth, questions, users, test
  },
  getters: {
    error: s => s.error
  },
})
