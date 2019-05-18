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
				const data = res.data[0]
				for (const key in data) {
					if (typeof data[key] === 'string') {
						data[key] = Sea.formatCity(data[key])
					}
				}
				console.log('🐸', data)
				this.setData({
					data: data,
				})
			}
		})
	},
	onShow() {},
})
