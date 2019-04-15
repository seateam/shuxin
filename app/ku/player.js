const log = console.log.bind(console, ">>>")
const Sea = require('./bigsea.js')
const player = wx.createInnerAudioContext()


// // 事件
// player.onWaiting(() => {
//     // log('加载中...')
// })
// player.onCanplay(() => {
//     player.play()
//     Sea.loading()
//     player.canplay = true
//     app.data.play.playing = true
//     app.data.play.fileFail = false
// })
// player.onPlay(() => {
//     app.data.play.playing = true
// })
// player.onPause(() => {
//     app.data.play.playing = false
// })
// player.onStop(() => {
//     app.data.play.playing = false
// })
// player.onEnded(() => {
//     app.data.play.playing = false
//     // 记录
//     let play = app.data.play
//     let e = play.list[play.id]
//     Sea.record(e.sectionID, e.timeAll)
//     play.playing = false
// })
// player.onError((res) => {
//     app.data.play.playing = false
//     app.data.play.fileFail = true
//     log('player error', res)
//     Sea.tip('音频文件已损坏', 'loading')
// })
// // 静态方法
// Object.assign(player, {
//     tip() {
//         let text = ''
//         if (app.data.play.price > 0) {
//             text = '点击下方立即购买按钮，可继续观看'
//             if (app.data.phone.ios) {
//                 text = '由于相关规范，iOS功能暂不可用。'
//             }
//         } else {
//             text = '点击下方分享解锁按钮，分享可继续观看'
//             if (app.data.phone.ios) {
//                 text = '由于相关规范，iOS功能暂不可用。'
//             }
//         }
//         Sea.tip(text)
//     },
//     url(e) {
//         return new Promise(function(success, fail) {
//             Sea.Ajax({
//                 url: "/applet/resource/resourceInfo",
//                 data: {
//                     // 课节id
//                     section_id: e.sectionID,
//                 }
//             }).then(res => {
//                 success(res.data.v_url || res.data.url || '')
//             })
//         })
//     },
//     minutes(s) {
//         return Math.ceil(s / 60)
//     },
//     time(n) {
//         let h = 0
//         let s = Math.floor(n % 60) || '00'
//         let m = Math.floor(n / 60) || '00'
//         if (m > 59) {
//             h = Math.floor(m / 60) || '00'
//             m = m % 60 || '00'
//         }
//         let result = [h, m, s].map(function(e) {
//             e = String(e)
//             if (e.length < 2) {
//                 e = '0' + e
//             }
//             return e
//         })
//         if (result[0] === '00') {
//             result = result.slice(1)
//         }
//         return result.join(':')
//     },
//     prev(that) {
//         let play = app.data.play
//         let prev = Number(play.id) - 1
//         if (prev < 0) {
//             // 归零
//             player.sliderChange(that, 0)
//         } else {
//             // 下一曲
//             player.playone(that, prev)
//         }
//     },
//     next(that) {
//         let play = app.data.play
//         let next = Number(play.id) + 1
//         if (next >= play.list.length || (play.list[next] && play.list[next].lock) || (play.list[next] && play.list[next].isWill === 1)) {
//             // 归零
//             player.sliderChange(that, 0)
//         } else {
//             // 下一曲
//             player.playone(that, next)
//         }
//     },
//     playone(that, i) {
//         let play = app.data.play
//         if (i == play.id) {
//             player.toggle(that)
//         } else {
//             let e = play.list[Number(i)]
//             player.stop()
//             // 播放
//             Sea.loading('音频加载中')
//             this.url(e).then(src => {
//                 player.src = src
//                 //
//                 play.id = i
//                 play.newList = false
//                 play.playing = true
//                 play.now = 0
//                 play.left = 0
//                 play.right = 0
//                 // 迷你播放器内容
//                 play.img = e.img
//                 that.setData({
//                     play: play,
//                 })
//             })
//         }
//     },
//     toggle(that) {
//         let play = app.data.play
//         if (play.newList || play.toBuy) {
//             // 去购买
//             if (play.toBuy) {
//                 play.toBuy = false
//             }
//             play.id = 0
//             let e = play.list[play.id]
//             // 新列表
//             if (play.newList && !e.lock) {
//                 play.newList = false
//             }
//             if (e.lock) {
//                 player.tip()
//             } else {
//                 Sea.loading('音频加载中')
//                 this.url(e).then(src => {
//                     player.src = src
//                 })
//                 play.img = e.img
//             }
//         } else {
//             let e = play.list[Number(play.id)]
//             if (e.lock) {
//                 player.tip()
//             } else {
//                 if (player.canplay) {
//                     if (play.playing) {
//                         player.pause()
//                         play.playing = false
//                     } else {
//                         if (play.fileFail) {
//                             // 文件损坏
//                             Sea.tip('音频文件损坏', '/ku/img/fail.png')
//                         } else {
//                             player.play()
//                             play.playing = true
//                         }
//                     }
//                     that.setData({
//                         play: play
//                     })
//                 } else {
//                     player.tip()
//                 }
//             }
//         }
//     },
//     stoped(that) {
//         let play = app.data.play
//         if (play.playing) {
//             player.pause()
//             play.playing = false
//         }
//         player.sliderChange(that, 0)
//     },
//     sliderChange(that, v) {
//         let play = app.data.play
//         // 时间
//         play.now = v
//         if (play.newList || play.now == 0) {
//             play.time = "00:00"
//             // play.timeAll = "00:00"
//         } else {
//             play.time = player.time(player.currentTime)
//             play.timeAll = player.time(player.duration)
//         }
//         // 进度条
//         let deg = v * 3.6
//         if (deg <= 180) {
//             play.right = deg
//             play.left = 0
//         } else {
//             play.right = 180
//             play.left = deg - 180
//         }
//         that.setData({
//             play: play,
//         })
//     },
//     initEvent(that) {
//         // 绑定数据
//         let play = app.data.play
//         // 事件
//         player.onTimeUpdate(function() {
            
//             // 显示迷你播放器
//             play.show = true
//             let now = player.currentTime
//             let all = player.duration
//             let v = Math.round(now / all * 100)
//             if (player.time(now) === play.time) {

//             } else {
//                 // 进度条更新
//                 if (player.paused == false) {
//                     player.sliderChange(that, v)
//                 }
//             }
//         })
//         player.onPause(function() {
//             if (play.playing) {
//                 player.pause()
//                 play.playing = false
//             }
//             that.setData({
//                 play: play
//             })
//         })
//         player.onEnded(function() {
//             player.next(that)
//         })
//         player.onError(function(res) {
//             setTimeout(function() {
//                 play.playing = false
//                 that.setData({
//                     play: play
//                 })
//             }, 1500)
//         })
//         // 注册回调函数
//         that.player_go = function(event) {
//             Sea.course(play.courseID)
//         }
//         that.player_play = function() {
//             player.toggle(this)
//         }
//         that.player_hide = function() {
//             play.close = true
//             play.show = false
//             that.setData({
//                 play: play
//             })
//         }
//         // if (play.playing) {
//         //     play.show = true
//         // } else {
//         //     play.show = false
//         // }
//         // 绑定数据
//         that.data.play = play
//         // 刷新
//         that.setData({
//             play: play
//         })
//     },
//     // 首次操作引导
//     videoFirst(that) {
//         let video = that.data.video
//         if (video.onceEnd) {
//         } else {
//             if (app.data.videoGuide === false) {
//                 app.data.videoGuide = true
//                 video.guide = true
//             }
//             video.onceEnd = true
//             that.setData({
//                 video: video,
//             }, () => {
//                 setTimeout(() => {
//                     video.guide = false
//                     that.setData({
//                         video: video,
//                     })
//                 }, 2500)
//             })

//         }
        
//     },
//     videoToggle(that, video) {
//         let play = app.data.play
//         if (play.newList) {
//             play.newList = false
//             play.id = 0
//             let e = play.list[play.id]
//             if (e.lock) {
//                 player.tip()
//             } else {
//                 // 初次
//                 this.videoFirst(that)
//                 this.url(e).then(src => {
//                     play.src = src
//                     play.playing = true
//                     that.setData({
//                         play: play
//                     }, () => {
//                         video.play()
//                         // Sea.loading('视频加载中')
//                     })
//                 })
//             }
//         } else {
//             if (play.playing) {
//                 play.playing = false
//                 that.setData({
//                     play: play
//                 }, () => {
//                     video.pause()
//                 })
//             } else {
//                 let e = play.list[play.id]
//                 if (e.lock) {
//                     player.tip()
//                 } else {
//                     // 初次
//                     this.videoFirst(that)
//                     if (play.src) {
//                         play.playing = true
//                         that.setData({
//                             play: play
//                         }, () => {
//                             video.play()
//                         })
//                     } else {
//                         this.url(e).then(src => {
//                             play.src = src
//                             play.playing = true
//                             that.setData({
//                                 play: play
//                             }, () => {
//                                 video.play()
//                             })
//                         })
//                     }
//                 }
//             }
//         }
//     },
//     videoOne(that, video, i) {
//         let play = app.data.play
//         if (i == play.id) {
//             this.videoToggle(that, video)
//         } else {
//             this.videoFirst(that)
//             play.id = Number(i)
//             let e = play.list[play.id]
//             this.url(e).then(src => {
//                 play.src = src
//                 // 清零
//                 play.playing = true
//                 play.newList = false
//                 play.now = 0
//                 play.left = 0
//                 play.right = 0
//                 that.setData({
//                     play: play
//                 }, () => {
//                     video.play()
//                     // Sea.loading('视频加载中')
//                 })
//             })
//         }
//     },
//     videoChange(that, v) {
//         let play = app.data.play
//         if (play.now != v) {
//             // 进度条
//             let deg = v * 3.6
//             if (deg <= 180) {
//                 play.right = deg
//                 play.left = 0
//             } else {
//                 play.right = 180
//                 play.left = deg - 180
//             }
//             that.setData({
//                 play: play,
//             })
//         }
//     },
// })
// module.exports = player
