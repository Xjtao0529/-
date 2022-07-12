import { publicRoutes, privateRoutes } from '../../router'
export default {
  namespaced: true,
  state: {
    routes: publicRoutes
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...publicRoutes, ...routes]
    }
  },
  actions: {
    filterRoutes({ commit }, menus) {
      const routes = []
      menus.forEach((name) => {
        const data = privateRoutes.filter((item) => item.name === name)
        routes.push(...data)
      })
      routes.push({
        path: '/:catchAll(./*)',
        redirect: '/404'
      })
      console.log(routes, 'll')
      commit('setRoutes', routes)
      return routes
    }
  }
}
