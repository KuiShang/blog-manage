/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 */
let baseUrl = ''
let routerMode = 'history'
let baseImgPath
let uploadPath
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://127.0.0.1:9528/'
  baseImgPath = 'http://127.0.0.1:9528/img/'
  uploadPath = baseUrl + 'v1/upload/'
} else {
  baseUrl = 'http://api.lovebugs.cc'
  baseImgPath = 'http://file.lovebugs.cc/img/'
  uploadPath = 'http://file.lovebugs.cc/upload/'
}
export {
  baseUrl,
  routerMode,
  uploadPath,
  baseImgPath
}
