const app = getApp()
const Sea = require('../../ku/bigsea.js')
Page({
	data: {
		shareIndex: 1,
	},
	onLoad() {},
	onShow() {},
	bindNext() {
    let i = this.data.shareIndex + 1
    if (i === 5) {
      i = 1
    }
    this.setData({
			shareIndex: i,
		})
  },
})
