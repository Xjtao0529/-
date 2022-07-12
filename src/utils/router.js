// 获取所有非一级路由
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((item) => {
    if (item.children && item.children.length > 0) {
      result.push(...item.children)
    }
  })
  return result
}

// 获取所有一级路由
export const filterRouters = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

// 检测空对象以及空数据 为空返回true
const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

// 将所有的一级路由处理成菜单数据

export const generateMenus = (routes) => {
  const result = []
  routes.forEach((item) => {
    if (isNull(item.meta) && isNull(item.children)) return

    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }

    const routePath = item.path

    let route = result.find((route) => route.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      if (item.meta.title) {
        result.push(route)
      }
    }

    if (item.children) {
      route.children.push(...generateMenus(item.children))
    }
  })
  result.reverse()
  return result
}
