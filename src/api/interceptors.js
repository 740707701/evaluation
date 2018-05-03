import axios from 'axios'
import router from '../router/index'

let AUTH_TOKEN = ''

//axios 默认值
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

//http request 拦截器
axios.interceptors.request.use(config => {
  config.headers["If-Modified-Since"] = 0;
  return config
}, err => {
  return Promise.reject(err)
})

//http response 拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if(error.response){
    switch(error.response.status){
      case 401:
      // store.commit('logout')
      router.replace({
        path: 'login',
        query: {redirect: router.currentRoute.fullPath}
      })
    }
  }
  return Promise.reject(error.response)
})

export default axios
