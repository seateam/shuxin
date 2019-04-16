const app = getApp()
const player = app.music.player
const Sea = require('../../ku/bigsea')
Page({
  data: {
    paused: true,
    silderNow: 0,
    song: null,
    list: null,
  },
  onLoad() {
    this.initMusic()
    this.setData({
      list: app.music.list,
      song: app.music.list[app.music.now]
    })
  },
  onShow() {
    // 恢复播放状态
    if (player.paused !== undefined) {
      this.setData({
        paused: player.paused,
      })
    }
  },
  initMusic() {
    const dict = {
      onCanplay: () => {
        this.setData({
          song: app.music.list[app.music.now],
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
      },
      onEnded: () => {
        this.setData({
          paused: true,
          silderNow: 0,
        })
      },
    }
    app.music.init((name, event) => {
      console.log(name)
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
})
