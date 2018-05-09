import axios from './interceptors'

class Api {
  constructor() { }
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  put() {
    return new Promise((resolve, reject) => {
      axios.put(url, data)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  del(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, data)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

}
export default Api