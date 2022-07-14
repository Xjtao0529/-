import request from '../utils/request'

/**
 *
 * @returns 获取验证码
 */
const getImgCode = () => {
  return request({
    url: '/captcha',
    method: 'GET'
  })
}
/**
 * 登录
 * @param {*} data
 * @returns
 */

const login = (data) => {
  return request({
    url: `/login?username=${data.username}&password=${data.password}&code=${data.code}&token=${data.token}`,
    method: 'POST',
    data
  })
}
/**
 * 获取路由信息
 * @returns
 */
const getMenuNav = () => {
  return request({
    url: '/menu/nav',
    method: 'GET'
  })
}
/**
 * 获取用户信息
 * @returns
 */
const getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'GET'
  })
}
/**
 * 退出
 * @returns
 */
const logout = () => {
  return request({
    url: '/logout',
    method: 'POST'
  })
}

const getUserList = (data) => {
  return request({
    url: '/user/list',
    method: 'GET',
    data
  })
}

/**
 * 添加用户
 * @param {*} data
 * @returns
 */
const addUserApi = (data) => {
  data.avatar = data.avatar
    ? data.avatar
    : 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg'
  return request({
    url: '/user/add',
    method: 'POST',
    data
  })
}
/**
 * 编辑用户
 * @param {} data
 * @returns
 */
const updateUserApi = (data) => {
  return request({
    url: '/user/update',
    method: 'PUT',
    data
  })
}
const roleListAPI = (data) => {
  return request({
    url: '/role/list',
    method: 'GET',
    data
  })
}
const roleAddApi = (data) => {
  return request({
    url: '/role/add',
    method: 'POST',
    data
  })
}
const userDelApi = (data) => {
  return request({
    url: '/user/del',
    method: 'POST',
    data
  })
}
const roleApi = (id, data) => {
  return request({
    url: `/user/assign/${id}`,
    method: 'POST',
    data
  })
}
export default {
  getImgCode,
  login,
  getMenuNav,
  getUserInfo,
  logout,
  getUserList,
  roleListAPI,
  addUserApi,
  updateUserApi,
  roleAddApi,
  userDelApi,
  roleApi
}
