const log = console.log.bind(console, '>>>')
const app = getApp()
const Sea = require('../../ku/bigsea')
Page({
  data: {
    paused: false,
  },
  onLoad(option) {},
  onShow() {},
  onHide() {},
  // 刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  bindPlay() {
    const paused = app.music.play()
    this.setData({
      paused: paused,
    })
  },
  bindNext() {
    app.music.next()
  },
  bindPrev() {
    app.music.prev()
  },
  bindButton() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
})
