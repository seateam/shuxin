const app = getApp()
const Sea = require('../../ku/bigsea.js')
Page({
	data: {
		shareIndex: 1,
		data: {},
		yearsIndex: 0,
		years: ['2019', '2018', '2017', '2016'],
	},
	onLoad() {
		Sea.Ajax({
			url: '/v1/card.share',
		}).then(res => {
			if (res.ok) {
				const data = Object.assign(res.data[0], res.data[1])
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
	bindNext() {
		let i = this.data.shareIndex + 1
		if (i === 5) {
			i = 1
		}
		this.setData({
			shareIndex: i,
		})
	},
	bindHoliday() {
		Sea.path('/pages/holiday/holiday')
	},
	bindYear() {
		let next = this.data.yearsIndex + 1
		if (next < this.data.years.length) {
			this.setData({
				yearsIndex: next,
			})
		}
	},
})
