import Layout from '../../Layout'
export default {
  path: '/System',
  name: 'sys:user:list',
  meta: {
    icon: 's-grid',
    title: '系统管理'
  },
  component: Layout,
  children: [
    {
      path: '/sys/users',
      name: 'user',
      component: () => import('../../views/User'),
      meta: {
        title: '用户管理',
        icon: 'user'
      }
    }
  ]
}
