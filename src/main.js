// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from './filters/filter'
import axios from './config/axiosWrapper'
import VueAxios from 'vue-axios'
// 数据模拟server
// require('./mockserver/index.js')
// 全局样式
require('./style/index.scss')
const isProd = process.env.NODE_ENV === 'production'
// vue设置
if (isProd) {
  Vue.config.performance = false
  Vue.config.productionTip = false
  Vue.config.silent = true
} else {
  Vue.config.performance = true
  Vue.config.productionTip = true
}

Vue.config.errorHandler = (err, vm, info) => {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
  console.log('数据监控：', err, vm, info)
}

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(ElementUI)

Object.keys(filters).forEach(k => {
  Vue.filter(k, filters[k])
})

Vue.mixin({
  computed: {
    mix_headers () {
      return {'Authorization': store.state.token}
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
