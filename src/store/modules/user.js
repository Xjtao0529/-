import { setItem, getItem, removeItem } from '../../utils/storage'
import loginApi from '../../api/login'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    menuList: {},
    UserInfo: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setUserInfo(state, UserInfo) {
      state.UserInfo = UserInfo
    },
    setmenuList(state, menuList) {
      state.menuList = menuList
    }
  },
  actions: {
    async getMenuList({ commit }) {
      const res = await loginApi.getMenuNav()
      console.log(res)
      commit('setmenuList', res.menus)
      return res
    },
    async getUserInfos({ commit }) {
      try {
        const res = await loginApi.getUserInfo()
        commit('setUserInfo', res)
        return res
      } catch (error) {}
    },
    logout({ commit }) {
      commit('setToken', '')
      commit('setUserInfo', '')
      removeItem('token')
    }
  }
}
