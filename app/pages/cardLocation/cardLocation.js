const app = getApp()
const Sea = require('../../ku/bigsea.js')
Page({
	data: {
		list: [],
	},
	onLoad() {
		// 获取周边位置
		wx.getLocation({
			type: 'gcj02',
			success: res => {
				const lat = res.latitude
				const lng = res.longitude
				const meter = 500
				Sea.Ajax({
					url: 'https://apis.map.qq.com/ws/place/v1/search',
					data: {
						boundary: `nearby(${lat},${lng},${meter})`,
						key: 'IHRBZ-RVWWQ-FHC5D-GGHIX-WPIGS-MABL6',
					},
				}).then(res => {
					this.setData({
						list: res.data,
					})
				})
			},
		})
	},
	onShow() {},
})
