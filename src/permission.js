import router from './router'
import store from './store'
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      if (!store.getters.UserInfo) {
        const res = await store.dispatch('user/getUserInfos')
        if (res) {
          const { authoritys } = await store.dispatch('user/getMenuList')
          const filterRoutes = await store.dispatch(
            'permission/filterRoutes',
            authoritys
          )
          filterRoutes.forEach((item) => {
            router.addRoute(item)
          })
          return next(to.path)
        } else {
          next()
        }
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
