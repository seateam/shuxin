const log = console.log.bind(console, ">>>")
const player = wx.createInnerAudioContext()
player.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
// 事件
player.onPlay(() => {
    player.playing = true
})
player.onPause(() => {
    player.playing = false
})
player.onStop(() => {
    player.playing = false
})
player.onEnded(() => {
    player.playing = false
})
player.onError((res) => {
    log(res.errMsg)
    log(res.errCode)
})
// 函数
player.toggle = function () {
    if (player.playing) {
        player.pause()
        return false
    } else {
        player.play()
        return true
    }
}

module.exports = player
