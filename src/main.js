// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
import './assets/css/reset.css'
import './assets/icon/iconfont.js'
// 引入全局的less文件
import ('!style-loader!css-loader!less-loader!./assets/css/colors.less')
import VueClipboard  from 'vue-clipboard2'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

import htmlToPdf from '@/components/HtmltoPdf.js'
Vue.use(htmlToPdf)

Vue.use(ElementUI)
Vue.use(VueClipboard )
Vue.use(VideoPlayer)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
