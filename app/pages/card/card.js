const app = getApp()
const Sea = require('../../ku/bigsea.js')
const moment = require('../../ku/moment.js')
Page({
	data: {
		colors: app.data.mark.arr,
		colorNow: 0,
		showColors: false,
		card: {},
		cardID: '',
	},
	initCard(res) {
		const card = res.data[0]
		card.date = moment(Number(card.time_stamp)).format('M/D HH:mm')
		card.contents = card.content.split('\n')
		return card
	},
	onLoad(option) {
		this.data.cardID = option.cardID
		Sea.Ajax({
			url: '/v1/card.get',
			data: {
				id: option.cardID,
			},
		}).then(res => {
			if (res.ok) {
				this.setData({
					card: this.initCard(res),
				})
			}
		})
	},
	onShow() { },
	bindColor(event) {
		const i = event.currentTarget.dataset.i
		this.setData({
			colorNow: i,
		})
	},
	bindEdit() {
		this.setData({
			showColors: true,
		})
	},
	bindClose() {
		Sea.Ajax({
			url: '/v1/card.update',
			data: {
				id: this.data.cardID,
				mark_color: this.data.colorNow,
			},
		}).then(res => {
			if (res.ok) {
				console.log('🐸', '颜色修改成功')
			}
		})
		this.setData({
			showColors: false,
		})
	},
})
