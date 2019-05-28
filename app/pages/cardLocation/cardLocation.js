const app = getApp()
const Sea = require('../../ku/bigsea.js')
Page({
	data: {
		list: [],
		now: 0,
	},
	onLoad() {
		const list = Sea.cardLocation || []
		this.setData({
			list: this.initList(list),
			now: Sea.cardLocationNow || 0,
		})
	},
	onShow() {},
	initList(list) {
		list = list.map(e => {
			const a = Sea.myLocation
			const b = e.location
			e.kilometers = Sea.getKilometers(a, b)
			return e
		})
		return list
	},
	bindOne(event) {
		const i = event.currentTarget.dataset.i
		this.setData({
			now: i,
		})
		Sea.cardLocationNow = i
		Sea.back()
	},
})
