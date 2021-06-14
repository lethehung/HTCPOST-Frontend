import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import asset from './modules/asset'

import permission from './modules/permission'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    asset,
    permission
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
