import axios from './interceptors'

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

  delete(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, data)
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