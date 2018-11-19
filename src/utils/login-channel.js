import Cookies from 'js-cookie'

const loginChannelKey = 'LoginOfficial'
/**
 * true 表示官方登录(U我派)
 * false 表示非官方登录
 */
export function getLoginChannel() {
  return Cookies.get(loginChannelKey)
}

export function setLoginChannel(bool) {
  return Cookies.set(loginChannelKey, bool)
}

export function removeLoginChannel() {
  return Cookies.remove(loginChannelKey)
}
