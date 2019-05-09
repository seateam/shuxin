const app = getApp()
const Sea = require('../../ku/bigsea.js')
Page({
	data: {
	},
	onLoad() {
		wx.getLocation({
			type: 'gcj02',
			success(res) {
				console.log('🐸', res)
				// const latitude = res.latitude
				// const longitude = res.longitude
				// const speed = res.speed
				// const accuracy = res.accuracy
			},
		})
	},
	onShow() {},
})
