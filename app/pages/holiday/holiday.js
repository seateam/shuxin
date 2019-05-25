const app = getApp()
const Sea = require('../../ku/bigsea.js')
Page({
	data: {
		data: {},
	},
	onLoad() {
		Sea.Ajax({
			url: '/v1/card.show',
		}).then(res => {
			if (res.ok) {
				let data = res.data[0]
				res.data.forEach(e => {
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
			}
		})
	},
	onShow() {},
})
