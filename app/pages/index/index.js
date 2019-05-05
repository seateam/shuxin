const app = getApp()
const Sea = require('../../ku/bigsea')
Page({
  data: {
  },
  onLoad() { },
  onShow() { },
  bindLogin(res) {
    console.log('🐸', res.detail)
    wx.login({
      success(res) {
        if (res.code) {
          console.log('🐸', res.code)
          // 发起网络请求
          // wx.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  // 刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
})



// code ->  weixin -> openid  123
// openid


// openid 