const log = console.log.bind(console, '>>>')
const app = getApp()
const Sea = require('../../ku/bigsea')

Page({
  data: {},
  onLoad(option) {},
  onShow() {},
  onHide() {},
  // 刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  bindButton() {
    console.log('🐸', '点了按钮')
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
})
