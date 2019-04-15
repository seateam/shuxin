export default {
  player: wx.getBackgroundAudioManager(),
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
  now: 0,
  // 播放
  play() {
    const paused = this.player.paused
    if (paused === undefined) {
      this.playOne(this.now)
      return true
    } else if (paused === false) {
      this.player.pause()
    } else if (paused === true) {
      this.player.play()
    }
    return paused
  },
  playOne(i) {
    const player = this.player
    const song = this.list[i]
    if (song && song.src) {
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
}
