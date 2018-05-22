const log = console.log.bind(console, '>>>')
const Sea = require('../../ku/bigsea')
const player = require('../../ku/player')
Page({
    data: {
        playing: '播放',
    },
    onShow() {

    },
    // userInfo
    login(res) {
        new Promise(function(success, fail) {
            // login
            wx.login({
                success(login) {
                    // SystemInfo
                    let data = {
                        res: res,
                        system: wx.getSystemInfoSync(),
                        code: login.code,
                    }
                    success(data)
                },
            })
        }).then(data => {
            let {res, system, code} = data
            let user = {
                // wx.login
                code: code,
                // system
                model: system.model,
                system: system.system,
                version: system.version,
                // res.detail.userInfo
                name: res.detail.userInfo.nickName,
                city: res.detail.userInfo.city,
                head_img: res.detail.userInfo.avatarUrl,
                province: res.detail.userInfo.province,
                // res.detail
                iv: res.detail.iv,
                encryptedData: res.detail.encryptedData,
                //
                types: "",
                subjectId: "",
            }
            log('登陆数据', user)
        })
    }
})
