const log = console.log.bind(console, '>>>')
const app = getApp()

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
