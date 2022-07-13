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
/**
 * 获取用户列表
 */

const getUserList = (data) => {
  return request({
    url: '/user/list',
    method: 'GET',
    data
  })
}
export default {
  getImgCode,
  login,
  getMenuNav,
  getUserInfo,
  logout,
  getUserList
}
