import request from '../utils/request'

const getImgCode = () => {
  return request({
    url: '/captcha',
    method: 'GET'
  })
}
const login = (data) => {
  return request({
    url: `/login?username=${data.username}&password=${data.password}&code=${data.code}&token=${data.token}`,
    method: 'POST',
    data
  })
}

const getMenuNav = () => {
  return request({
    url: 'menu/nav',
    method: 'GET'
  })
}
export default {
  getImgCode,
  login,
  getMenuNav
}
