import request from '../utils/request'
/**
 * 获取角色列表API
 * @param data
 * @returns {AxiosPromise}
 */
export const roleListAPI = (data) => {
  return request({
    url: '/role/list',
    method: 'GET',
    data
  })
}

/**
 * 添加角色
 * @param data
 * @returns {AxiosPromise}
 */
export const roleAddApi = (data) => {
  return request({
    url: '/role/add',
    method: 'POST',
    data
  })
}

export const roleEditAPI = (data) => {
  return request({
    url: '/role/update',
    method: 'PUT',
    data
  })
}

export const roleInfoAPI = (id) => {
  return request({
    url: `/role/info/${id}`,
    method: 'GET'
  })
}

export const rolePermAPI = (id, roles) => {
  return request({
    url: `/role/perm/${id}`,
    method: 'POST',
    data: roles
  })
}

export const MenuNav = () => {
  return request({
    url: '/menu/nav',
    method: 'GET'
  })
}
