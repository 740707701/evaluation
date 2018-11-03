import axios from './interceptors'
axios.defaults.baseURL = 'http://101.132.166.37:8080/cepingweb'; //api测试环境地址
// axios.defaults.baseURL = 'http://192.168.0.177:8089/cepingweb/'; //resume本机
// axios.defaults.baseURL = 'http://192.168.0.192:8089/cepingweb/'; //plan本机

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