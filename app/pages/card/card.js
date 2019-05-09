const app = getApp()
const Sea = require('../../ku/bigsea.js')
Page({
	data: {
		mark: app.data.mark,
	},
	onLoad() {},
	onShow() {},
	bindColor(event) {
		const i = event.target.dataset.i
		const mark = app.data.mark
		mark.now = i
		this.setData({
			mark: mark,
		})
	},
	bindLocation(){
		Sea.path('/pages/cardLocation/cardLocation')
	}
})
