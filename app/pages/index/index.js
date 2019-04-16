const app = getApp()
const player = app.music.player
const Sea = require('../../ku/bigsea')
Page({
  data: {
    list: [
      {
        title: '浮生',
        epname: '浮生',
        singer: '刘莱斯',
        coverImgUrl:
          'http://p1.music.126.net/mhWnNBXzrY83dNWJ6GDGwg==/109951163872080254.jpg',
        src: 'https://music.163.com/song/media/outer/url?id=445546453.mp3',
      },
      {
        title: '情歌王',
        epname: '我还是你的 - 情歌王',
        singer: '古巨基',
        coverImgUrl:
          'http://p2.music.126.net/pKGF1VAaqAW5ICLlrO5pVw==/6657542906242861.jpg',
        src: 'https://music.163.com/song/media/outer/url?id=86279.mp3',
      },
      {
        title: '烟火里的尘埃',
        epname: '烟火里的尘埃',
        singer: '华晨宇',
        coverImgUrl:
          'http://p1.music.126.net/_49Xz_x9kTTdEgmYYk6w2w==/6672936069046297.jpg',
        src: 'https://music.163.com/song/media/outer/url?id=29004400.mp3',
      },
    ],
  },
  onLoad() {
  },
  onShow() {},
  bindMusic(event) {
    app.music.list = this.data.list
    wx.navigateTo({
      url: '/pages/music/music',
    })
  },
  onHide() {},
  // 刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
})
