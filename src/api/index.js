import axios from './interceptors'
// axios.defaults.baseURL = 'http://101.132.166.37:8080/cepingweb' // 线上环境 其他学校调用地址 部署在37文件下
axios.defaults.baseURL = 'http://101.132.100.21:8080/cepingweb' // 线上环境 收费学校调用地址 部署在21文件夹下
// axios.defaults.baseURL = 'http://192.168.0.177:9088/cepingweb/' //resume本机
// axios.defaults.baseURL = 'http://192.168.0.191:8089/cepingweb/' //plan本机

class Api {
  constructor() {}
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(res => {
        if (res.data.code == 1) {
          resolve(res.data)
        } else {
          console.log(res)
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(res => {
          if (res.data.code == 1) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  put(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, data)
        .then(res => {
          if (res.data.code == 1) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, {params: params})
        .then(res => {
          if (res.data.code == 1) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }

}
export default new Api()