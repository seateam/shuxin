const Sea = require('../../ku/bigsea.js')
const app = getApp()
Page({
	data: {
		keyword: '',
		mapTop: 64,
		latitude: 39.90374,
		longitude: 116.397827,
		markers: [
			{
				id: 0,
				latitude: 23.099994,
				longitude: 113.34452,
				width: 22,
				height: 27,
				name: '鬼地方',
				iconPath: './img/mark.png',
			},
			{
				id: 1,
				latitude: 23.099994,
				longitude: 113.30452,
				width: 22,
				height: 27,
				name: '鬼地方2',
				iconPath: './img/mark.png',
			},
		],
	},
	onReady() {
		this.mapCtx = wx.createMapContext('map')
	},
	onLoad() {
		const navBar = app.data.navBar
		this.setData({
			mapTop: navBar.marginTop + navBar.height,
		})
	},
	onShow() {
		this.initSearch()
		this.initMarkers()
	},
	initSearch() {
		const search = app.data.search
		if (search && search.location) {
			this.setData({
				latitude: search.location.lat,
				longitude: search.location.lng,
				keyword: search.title,
			})
		}
	},
	initMarkers() {
		// 初始化打卡地点
		Sea.Ajax({
			url: '/v1/card.get',
		}).then(res => {
			if (res.ok) {
				const markers = res.data.map((e, i) => {
					const [latitude, longitude] = e.location.split(',')
					return {
						id: e.id,
						latitude: latitude,
						longitude: longitude,
						width: 22,
						height: 27,
						name: e.content,
						iconPath: './img/mark.png',
					}
				})
				this.setData({
					markers: markers,
				})
				this.bindPoints()
			}
		})
	},
	getCenterLocation() {
		this.mapCtx.getCenterLocation({
			success(res) {
				console.log('🐸', res)
			},
		})
	},
	bindLocation() {
		this.mapCtx.moveToLocation()
	},
	bindSearch() {
		Sea.path('/pages/search/search')
	},
	bindPoints() {
		this.mapCtx.includePoints({
			padding: [30],
			points: this.data.markers,
		})
	},
	bindData() {
		Sea.path('/pages/data/data')
	},
	bindCard() {
		Sea.path('/pages/card/card')
	},
	bindShare() {
		Sea.path('/pages/share/share')
	},
})
