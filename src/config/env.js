/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 */
let baseUrl = ''
let routerMode = 'history'
let uploadPath
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://127.0.0.1:9528/'
  // baseUrl = ''
  uploadPath = baseUrl + 'v1/upload/'
} else {
  // baseUrl = 'http://api.lovebugs.top'
  // uploadPath = 'http://file.lovebugs.cc/upload/'
  baseUrl = 'http://59.110.223.161:9528/'
  uploadPath = 'http://59.110.223.161:9528/upload/'
}
export {
  baseUrl,
  routerMode,
  uploadPath
}
