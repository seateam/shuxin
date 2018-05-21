const log = console.log.bind(console, '>>>')
const player = require('../../ku/player')
const Sea = require('../../ku/bigsea')
const config = require('../../ku/config')

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
})
