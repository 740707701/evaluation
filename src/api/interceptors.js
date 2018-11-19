import axios from 'axios'
import store from '../store/index'
import router from '../router/index'

//axios 默认值
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.plat = 'uwopai';
// axios.defaults.withCredentials = true; //让ajax携带cookie
let sysbelong = location.href.substring(location.href.lastIndexOf('://')+3,location.href.lastIndexOf('.uwopai.com'))
if (sysbelong === 'www' || sysbelong === 'http://') { 
  sysbelong = 'uwopai'
}
if (process.env.NODE_ENV === 'production') {
  axios.defaults.headers.sysbelong = sysbelong
}else {
  axios.defaults.headers.sysbelong = 'uwopai' // 'imun'
}
//http request 拦截器
axios.interceptors.request.use(config => {
  if (store.getters.getToken) {
    config.headers.Authorization = `${store.getters.getToken}`
  }    
  return config
}, err => {
  return Promise.reject(err)
})

//http response 拦截器
axios.interceptors.response.use(function(response) {
    if (response.data.code === 1) {
      return Promise.resolve(response)
    } else {
      if (response.data.code === 401) {
        store.commit('logout')
        router.replace({
          path: '/',
          query: { redirect: router.currentRoute.fullPath } //router.history.current.fullPath
        })
      } else if(response.data.code === 402){
        store.commit('logout')
        router.replace({path: '/'})
      }
      return Promise.reject(response)
    }
  }, function(error) {
    // console.log('拦截器', error)
    return Promise.reject(error)
  })
  //判断登录状态
  // router.beforeEach((to, from, next) => {
  //   let user = router.app.$options.store.state.user.loginInfo.data.data.token
  //   if (to.matched.some(recored => recored.meta.isLogin)) {
  //     if (JSON.stringify(user) == '') {
  //       next()
  //       router.push({ path: '/', query: { redirect: to.fullPath } })
  //     } else {
  //       next()
  //     }
  //   } else {
  //     next()
  //   }
  // })

export default axios