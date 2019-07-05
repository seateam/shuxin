const app = getApp()
const Sea = require('../../packages/bigsea.js')
Page({
  data: {},
  onLoad() {},
  bindPost() {
    let data = {
      content: '',
      location: '',
      mark_color: '',
      time_stamp: '',
      location_text: '',
      public: '',
      openid: '用户openid',
    }
    console.log('🍓', data)
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
})
