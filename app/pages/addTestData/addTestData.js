const app = getApp()
const Sea = require('../../packages/bigsea.js')
Page({
  data: {},
  onLoad() {
    Sea.Ajax({
      url: '/v1/card.add',
      data: {
        content: '',
        location: '',
        mark_color: '',
        time_stamp: '',
        location_text: '',
        public: '',
        openid: '',
      },
    }).then((res) => {
      if (res && res.ok) {
        console.log('🐸', '发布成功')
      } else {
        console.log('🐸', '发布失败')
      }
    })
  },
})
