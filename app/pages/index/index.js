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
    const player = wx.getBackgroundAudioManager()

    player.title = '此时此刻'
    player.epname = '此时此刻'
    player.singer = '许巍'
    player.coverImgUrl =
      'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    player.src =
      'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    // wx.navigateTo({
    //   url: '/pages/about/about',
    // })
  },
})
