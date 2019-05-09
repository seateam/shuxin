const app = getApp()
const Sea = require('../../ku/bigsea.js')
const QQMapWX = require('../../ku/qqmap-wx-jssdk.js')
const qqmapsdk = new QQMapWX({
  key: '7FXBZ-CJRKF-L7KJI-J4RNO-YZ372-IYFDP'
})
Page({
  data: {
    list: [],
  },
  onLoad() {},
  onShow() {},
  bindInput(event) {
    const v = event.detail.value
    qqmapsdk.getSuggestion({
      keyword: v,
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: (res) => {
        this.setData({
          list: res.data
        })
      }
    })
  },
  bindOne(event) {
    const i = event.currentTarget.dataset.i
    const e = this.data.list[i]
    app.data.location = e.location
    Sea.back()
  },
})