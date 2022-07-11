import { setItem, getItem } from '../../utils/storage'
import loginApi from '../../api/login'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    menu: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    }
  },
  actions: {
    async getMenuList({ commit }) {
      const res = await loginApi.getMenuNav()
      console.log(res)
    }
  }
}
