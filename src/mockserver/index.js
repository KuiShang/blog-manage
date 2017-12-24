import urls from '@/config/urls'
var axios = require('axios')
var MockAdapter = require('axios-mock-adapter')
var mock = new MockAdapter(axios, { delayResponse: 2000 })
// 登录
mock.onPost(urls.login).reply(200, {
  status: 0,
  message: '',
  data: {
    'username': 'kk',
    'password': 123
  }
})
// 修改密码
mock.onPost(urls.modifyPsw).reply(200, {
  status: 0,
  message: '',
  data: {
    'username': 'kui',
    'password': 123
  }
})

// 退出登录
mock.onPost(urls.logout).reply(200, {
  status: 0,
  message: '',
  data: {
  }
})
export default mock
