import Vue from 'vue'
import Router from 'vue-router'
const login = r => require.ensure([], () => r(require('@/pages/login/login')), 'login')
const manage = r => require.ensure([], () => r(require('@/pages/manage/manage')), 'manage')
const pageview = r => require.ensure([], () => r(require('@/pages/pageview/pageview')), 'pageview')
const article = r => require.ensure([], () => r(require('@/pages/article/article')), 'article')
const catalog = r => require.ensure([], () => r(require('@/pages/catalog/catalog')), 'catalog')
const comment = r => require.ensure([], () => r(require('@/pages/comment/comment')), 'comment')
const emailconfig = r => require.ensure([], () => r(require('@/pages/emailconfig/emailconfig')), 'emailconfig')
const setting = r => require.ensure([], () => r(require('@/pages/setting/setting')), 'setting')
const tag = r => require.ensure([], () => r(require('@/pages/tag/tag')), 'tag')
const NotFoundComponent = r => require.ensure([], () => r(require('@/pages/NotFoundComponent/NotFoundComponent')), 'NotFoundComponent')

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/manage',
      component: manage,
      children: [
        {
          path: 'pageview',
          component: pageview,
          name: 'pageview'
        },
        {
          path: 'article',
          component: article,
          name: 'article'
        },
        {
          path: 'catalog',
          component: catalog,
          name: 'catalog'
        },
        {
          path: 'comment',
          component: comment,
          name: 'comment'
        },
        {
          path: 'email-config',
          component: emailconfig,
          name: 'emailconfig'
        },
        {
          path: 'setting',
          component: setting,
          name: 'setting'
        },
        {
          path: 'tag',
          component: tag,
          name: 'tag'
        }
      ]
    },
    {
      path: '*',
      name: 'NotFoundComponent',
      component: NotFoundComponent
    }
  ]
})
