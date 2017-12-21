import Vue from 'vue'
import Router from 'vue-router'
const login = r => require.ensure([], () => r(require('@/pages/login/login')), 'login')
const manage = r => require.ensure([], () => r(require('@/pages/manage/manage')), 'manage')
const home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/manage',
      component: manage,
      children: [{
        path: 'pageview',
        component: home,
        name: 'home'
      }]
    }
  ]
})
