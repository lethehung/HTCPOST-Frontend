import { getListProvince } from '@/api/asset'

const asset = {
  state: {
    list_province: []
  },

  mutations: {
    SET_LIST_PROVINCE: (state, listProvince) => {
      state.list_province = listProvince
    }
  },

  actions: {
    GetListProvince ({ commit }) {
      return new Promise((resolve, reject) => {
        getListProvince().then(data => {
          commit('SET_LIST_PROVINCE', data.data.province)
          resolve()
        })
      })
    }
  }
}

export default asset
