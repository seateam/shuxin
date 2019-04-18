const app = getApp()
const player = app.music.player
const Sea = require('../../ku/bigsea')
Page({
  data: {
    paused: true,
    silderNow: 0,
    song: null,
    songNow: null,
    list: null,
    timeAll: '00:00',
    timeNow: '00:00',
  },
  onLoad() {
    app.music.list = [
      {
        title: `迷途羔羊`,
        epname: `天兵`,
        singer: '张震岳',
        coverImgUrl:
          'http://p2.music.126.net/b1eSBbx2Yia0k89ocfOnjQ==/18677404023325159.jpg',
        src: 'https://music.163.com/song/media/outer/url?id=454698657.mp3',
      },
      {
        title: `One's 4 Da Money`,
        epname: `Shyheim A.K.A. The Rugged Child`,
        singer: 'Shyheim',
        coverImgUrl:
          'http://p2.music.126.net/YsnhX9fYeQ1j6RhiXpqlAw==/109951163548510199.jpg',
        src: 'https://music.163.com/song/media/outer/url?id=3464474.mp3',
      },
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
    ]
    this.initMusic()
    this.setData({
      list: app.music.list,
      song: app.music.list[app.music.now],
    })
  },
  onShow() {
    // 恢复播放状态
    const now = player.currentTime
    const all = player.duration
    const progress = Math.round((now / all) * 100)
    if (!app.music.new) {
      this.setData({
        songNow: app.music.now,
        paused: player.paused,
        silderNow: progress,
      })
    }
  },
  initMusic() {
    const dict = {
      onCanplay: () => {
        const song = app.music.list[app.music.now]
        song.played = true
        this.setData({
          songNow: app.music.now,
          song: song,
          list: app.music.list,
          timeAll: app.music.time(player.duration),
          timeNow: app.music.time(player.currentTime),
        })
      },
      onPlay: () => {
        this.setData({
          paused: false,
        })
      },
      onPause: () => {
        this.setData({
          paused: true,
        })
      },
      onTimeUpdate: () => {
        const now = player.currentTime
        const all = player.duration
        const v = Math.round((now / all) * 100)
        if (this.data.silderNow !== v) {
          this.setData({
            silderNow: v,
          })
        }
        const timeNow = app.music.time(player.currentTime)
        if (this.timeNow !== timeNow) {
          this.setData({
            timeNow: timeNow,
          })
        }
      },
      onEnded: () => {
        this.setData({
          paused: true,
          silderNow: 0,
        })
        app.music.next()
      },
    }
    app.music.init((name, event) => {
      if (dict[name]) {
        dict[name](event)
      }
    })
  },
  // 滚动条事件
  bindSlider(event) {
    let v = event.detail.value
    player.seek((v / 100) * player.duration)
  },
  bindPlay() {
    app.music.play()
  },
  bindNext() {
    app.music.next()
  },
  bindPrev() {
    app.music.prev()
  },
  bindSong(event) {
    const i = event.currentTarget.dataset.index
    app.music.playOne(i)
  },
  bindButton() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onHide() {},
  // 刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  onUnload() {
    // console.log('页面卸载')
  },
})
