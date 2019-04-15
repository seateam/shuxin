const log = console.log.bind(console, '>>>')
const app = getApp()
const Sea = require('../../ku/bigsea')

Page({
  data: {},
  onLoad() {},
  onShow() {},
  onHide() {},
  // 刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
})
