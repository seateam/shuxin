const app = getApp()
const Sea = require('../../packages/bigsea.js')
Page({
  data: {
    data: {},
  },
  onLoad(option) {
    Sea.Ajax({
      url: '/v1/card.show',
      data: {
        openid: option.openid || '',
        data: {},
      },
    }).then((res) => {
      if (res.ok && res.data && res.data.length) {
        let data = res.data[0]
        res.data.forEach((e) => {
          if (e.year === Sea.shareYear) {
            data = e
          }
        })
        for (const key in data) {
          if (typeof data[key] === 'string') {
            data[key] = Sea.formatCity(data[key])
          }
        }
        this.setData({
          data: data,
        })
      } else {
        Sea.alert('您还没有打卡')
      }
    })
  },
  onShow() {},
  onShareAppMessage() {
    let openid = this.openid || wx.getStorageSync('token')
    return {
      title: '蓝色潮汐 点击进入我的假日回忆！',
      path: '/pages/holiday/holiday?openid=' + openid,
    }
  },
})
