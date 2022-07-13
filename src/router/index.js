import Vue from 'vue'
import VueRouter from 'vue-router'
import User from './modules/User'
import Menus from './modules/Menus'
import Roles from './modules/Roles'
Vue.use(VueRouter)

export const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login'),
    children: []
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('../Layout'),
    children: [
      {
        path: '/system',
        name: 'system',
        component: () => import('../views/console/index.vue'),
        meta: {
          title: '控制台',
          icon: 'el-icon-s-home'
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/error-page/404.vue')
  }
]
export const privateRoutes = [User, Menus, Roles]
const router = new VueRouter({
  routes: publicRoutes
})

export default router
