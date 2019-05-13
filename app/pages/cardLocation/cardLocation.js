const app = getApp()
const Sea = require('../../ku/bigsea.js')
Page({
	data: {
		list: [],
		now: 0,
	},
	onLoad() {
		this.setData({
			list: Sea.cardLocation,
			now: Sea.cardLocationNow || 0,
		})
	},
	onShow() {},
	bindOne(event) {
		const i = event.currentTarget.dataset.i
		this.setData({
			now: i,
		})
		Sea.cardLocationNow = i
		Sea.back()
	},
})
