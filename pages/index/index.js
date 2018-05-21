const log = console.log.bind(console, '>>>')
const Sea = require('../../ku/bigsea')
const player = require('../../ku/player')

Sea.Ajax({
    url:"/applet/v1_2/subject/subDetails",
}).then(res => {
    log(res)
})

Page({
    data: {
        playing: '播放',
    },
    onShow() {

    },
    play() {
        this.setData({
            playing: player.toggle() ? "暂停" : "播放"
        })
    },
    login(e) {
        log(e)
    }
})
