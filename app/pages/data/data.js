const app = getApp()
const Sea = require('../../packages/bigsea.js')
const moment = require('../../packages/moment.js')
const request = {
	id: null,
	year: null,
	month: null,
	province: null,
}
Page({
	data: {
		heads: [
			'./head.svg',
			'./head.svg',
			'./head.svg',
		],
		colors: app.data.mark.arr,
		province: [],
		provinceNow: 'all',
		date: [],
		dateNow: 'all',
		cards: [],
		cardLength: 0,
	},
	onLoad() {
		const cards = []
		Sea.Ajax({
			url: '/v1/card.get',
		}).then(res => {
			if (res.ok && res.data.length) {
				const province = this.initProvince(res)
				this.setData({
					province: province,
					provinceShow: province.map(e => Sea.formatProvince(e)),
					date: this.initDate(res),
					cardLength: res.data.length,
					cards: this.initCards(res),
				})
			}
		})
	},
	onShow() {
		this.render()
	},
	initProvince(res) {
		const arr = ['省', '自治区']
		const result = res.data.map(e => e.province)
		return Array.from(new Set(result))
	},
	initDate(res) {
		const o = {}
		for (const e of res.data) {
			if (o[e.year]) {
				o[e.year].push(e.month)
			} else {
				o[e.year] = []
				o[e.year].push(e.month)
			}
		}
		const arr = []
		Object.keys(o)
			.map(e => Number(e))
			.sort((a, b) => a < b)
			.forEach(e => {
				const month = o[e].map(e => Number(e))
				arr.push({
					year: e,
					month: Array.from(new Set(month)).reverse(),
				})
			})
		return arr
	},
	initCards(res) {
		const cards = res.data.map(e => {
			const date = moment(Number(e.time_stamp))
			return {
				content: e.content,
				date: date.format('YYYY-MM-DD'),
				city: Sea.formatCity(e.city),
				id: e.id,
				mark_color: e.mark_color,
			}
		})
		return cards.reverse()
	},
	bindCard(event) {
		const id = event.currentTarget.dataset.id
		Sea.path('/pages/card/card', {
			cardID: id,
		})
	},
	bindProvince(event) {
		const i = event.currentTarget.dataset.i
		if (this.data.provinceNow === i) {
			this.bindAllProvince()
			return
		}
		this.setData({
			provinceNow: i,
		})
		request.province = this.data.province[i]
		this.render()
	},
	bindMonth(event) {
		const arr = event.currentTarget.dataset.arr
		const dateNow = this.data.dateNow
		if (dateNow[0] === arr[0] && dateNow[1] === arr[1]) {
			this.bindAllMonth()
			return
		}
		const date = this.data.date[arr[0]]
		const year = date.year
		const month = date.month[arr[1]]
		request.year = String(year)
		request.month = String(month).padStart(2, '0')
		this.render()
		this.setData({
			dateNow: arr,
		})
	},
	bindAllMonth() {
		request.year = null
		request.month = null
		this.render()
		this.setData({
			dateNow: 'all',
		})
	},
	bindWithYou() {
Sea.path('pages/withYou/withYou')
	},
	bindAllProvince() {
		request.province = null
		this.render()
		this.setData({
			provinceNow: 'all',
		})
	},
	render() {
		const data = {}
		for (const key in request) {
			const e = request[key]
			if (e) {
				data[key] = e
			}
		}
		Sea.Ajax({
			url: '/v1/card.get',
			data: data,
		}).then(res => {
			if (res.ok) {
				this.setData({
					cards: this.initCards(res),
				})
			} else {
				Sea.tip('读取失败')
			}
		})
	},
})
