import urls from '@/config/urls'
var axios = require('axios')
var MockAdapter = require('axios-mock-adapter')
var mock = new MockAdapter(axios)
// 登录
mock.onPost(urls.login).reply(200, {
  status: 0,
  message: '',
  data: {}

})
export default mock
