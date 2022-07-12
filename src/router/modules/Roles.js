import Layout from '../../Layout'
export default {
  path: '/System',
  name: 'sys:role:list',
  meta: {
    icon: 's-grid',
    title: '系统管理'
  },
  component: Layout,
  children: [
    {
      path: '/sys/roles',
      name: 'role',
      component: () => import('../../views/Roles'),
      meta: {
        title: '角色管理',
        icon: 'user-solid'
      }
    }
  ]
}
