const app = getApp()
const Sea = require('../../ku/bigsea.js')
Page({
	data: {
		data: {},
	},
	onLoad() {
		Sea.Ajax({
			url: '/v1/card.show',
			data: {
				openid: Sea.friendToken,
			},
		}).then(res => {
			if (res.ok && res.data && res.data.length) {
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
			} else {
				Sea.alert('您还没有打卡')
			}
		})
	},
	onShow() {},
})
