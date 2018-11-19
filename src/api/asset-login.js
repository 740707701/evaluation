import axios from 'axios'
//axios 默认值
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function getLoginConfig() {
  return axios.request({
    baseURL: 'http://192.168.0.177:9088/saasplat',
    url: '/domain',
    method: 'get'
  })
}