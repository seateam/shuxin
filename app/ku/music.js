const music = {
  player: wx.getBackgroundAudioManager(),
  list: [],
  listID: '',
  now: 0,
  // 新列表
  new: true,
  // 连续点击播放
  continuousClick: false,
  // 播放
  play() {
    const player = this.player
    const paused = this.player.paused
    const progress = Math.round((player.currentTime / player.duration) * 100)
    // 重新播放
    if (this.new || progress === 100) {
      this.playOne(this.now)
      this.new = false
    } else if (paused === false) {
      this.continuousClick = false
      player.pause()
    } else if (paused === true) {
      // 连续点击播放 小程序bug 音乐被后台杀掉
      if (this.continuousClick) {
        this.playOne(this.now)
      } else {
        player.play()
        this.continuousClick = true
      }
    }
  },
  // 播放第 n 首
  playOne(i) {
    const player = this.player
    const song = this.list[i]
    if (song && song.src) {
      if (player.src === song.src) {
        player.title = song.title
        player.src = song.src
        return
      }
      this.now = i
      player.title = song.title
      player.epname = song.epname
      player.singer = song.singer
      player.coverImgUrl = song.coverImgUrl
      player.src = song.src
    }
  },
  // 暂停
  pause() {
    const player = this.player
    player.pause()
  },
  // 下一曲
  next() {
    this.playOne(this.now + 1)
  },
  // 上一曲
  prev() {
    this.playOne(this.now - 1)
  },
  // 时间格式
  time(n) {
    let h = 0
    let s = Math.floor(n % 60) || '00'
    let m = Math.floor(n / 60) || '00'
    if (m > 59) {
      h = Math.floor(m / 60) || '00'
      m = m % 60 || '00'
    }
    let result = [h, m, s].map(function(e) {
      e = String(e)
      if (e.length < 2) {
        e = '0' + e
      }
      return e
    })
    if (result[0] === '00') {
      result = result.slice(1)
    }
    return result.join(':')
  },
  // 回调
  init(callback) {
    const player = this.player
    // 监听背景音频进入可播放状态事件。但不保证后面可以流畅播放
    player.onCanplay(event => callback('onCanplay', event))
    // 监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发
    player.onWaiting(event => callback('onWaiting', event))
    // 监听背景音频播放错误事件
    player.onError(event => callback('onError', event))
    // 监听背景音频播放事件
    player.onPlay(event => callback('onPlay', event))
    // 监听背景音频暂停事件
    player.onPause(event => callback('onPause', event))
    // 监听背景音频开始跳转操作事件
    player.onSeeking(event => callback('onSeeking', event))
    // 监听背景音频完成跳转操作事件
    player.onSeeked(event => callback('onSeeked', event))
    // 监听背景音频自然播放结束事件
    player.onEnded(event => callback('onEnded', event))
    // 监听背景音频停止事件
    player.onStop(event => callback('onStop', event))
    // 监听背景音频播放进度更新事件
    player.onTimeUpdate(event => callback('onTimeUpdate', event))
    // 监听用户在系统音乐播放面板点击下一曲事件（仅iOS）
    player.onNext(event => {
      this.next()
      callback('onNext', event)
    })
    // 监听用户在系统音乐播放面板点击上一曲事件（仅iOS）
    player.onPrev(event => {
      this.prev()
      callback('onPrev', event)
    })
  },
  // 新列表
  initList(list, id) {
    if (this.listID !== id) {
      // 清除播放记录
      for (const song of list) {
        delete song.played
      }
      this.listID = id
      this.player.stop()
      this.now = 0
      // 新列表
      this.new = true
      this.list = list
    }
  },
}
export default music
