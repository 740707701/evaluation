import axios from 'axios'
import store from '../store/index'
import router from '../router/index'

let AUTH_TOKEN = ''

//axios 默认值
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://139.196.104.246:8089/cepingweb'; //api测试环境地址
// axios.defaults.baseURL = 'http://192.168.0.176:8080/cepingweb/'; //resume本机
// axios.defaults.baseURL = 'http://192.168.0.191:8089/cepingweb/'; //plan本机
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

//http request 拦截器
axios.interceptors.request.use(config => {
  config.headers["If-Modified-Since"] = 0;
  if(store.getters.getToken){
    config.headers.Authorization = `Token ${store,grtters.getToken}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

//http response 拦截器
axios.interceptors.response.use(function (response) {
  console.log('------',response)
  if(response.data.code == 1){
    return Promise.resolve(response) 
  }else {
    return Promise.reject(response)
  }
}, function (error) {
  if(error.response){
    switch(error.response.status){
      case 401:
      store.commit('logout')
      router.replace({
        path: 'login',
        query: {redirect: router.currentRoute.fullPath}
      })
    }
  }
  return Promise.reject(error.response)
})

export default axios
