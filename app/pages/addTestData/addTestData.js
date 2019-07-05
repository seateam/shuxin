const app = getApp()
const Sea = require('../../packages/bigsea.js')
Page({
  data: {},
  onLoad() {},
  bindPost() {
    let data = {
      content: `如果流浪是你的天赋 那麼你一定是我 最美的追逐
如果爱情是你的游牧 拥有过 是不是 该满足
我将眼泪流成天山上面的湖 让你疲倦时能够扎营停伫
羌笛声 胡旋舞 为你笑 为你哭
爱上你 的全部 放弃我 的全部 -------------丝路`,
      location: '31.99115,116.97164',
      mark_color: '2',
      time_stamp: '1547185375000',
      location_text: '合肥新桥国际机场',
      public: true,
      // openid: 'o6iD25VhzkWx-uk2xDszuyD3yhiQ',
    }
    Sea.Ajax({
      url: '/v1/card.add',
      data: data,
    }).then((res) => {
      if (res && res.ok) {
        console.log('🐸', '发布成功')
      } else {
        console.log('🐸', '发布失败')
      }
    })
  },
  bindLook() {
    Sea.Ajax({
      url: '/v1/card.get',
      data: {
        // openid: 'o6iD25VhzkWx-uk2xDszuyD3yhiQ',
      },
    }).then((res) => {
      console.log('🐸', res.data)
    })
  },
})
