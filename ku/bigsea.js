const log = console.log.bind(console, ">>>")
const config = require('config.js')
const Sea = {
    Ajax(request) {
        // 获取token
        let req = {
            url: config.host + request.url,
            data: request.data || {},
            header: request.header || {},
        }
        req.data.token = wx.getStorageSync("token")
        req.header["Content-Type"] = "application/json"

        return new Promise(function(success, fail) {
            wx.request({
                url: req.url,
                data: req.data,
                header: req.header,
                success: function(res) {
                    success(res)
                    // if (res.statusCode === 200) {
                    //     if (res.data.resultCode == 2) {
                    //         log("token失效")
                    //     } else {
                    //         success(res.data);
                    //     }
                    // }
                },
                fail: function(err) {
                    fail(err)
                }
            })
        })
    },
}
module.exports = Sea;
