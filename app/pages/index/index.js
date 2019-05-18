const Sea = require('../../ku/bigsea.js')
const app = getApp()
Page({
	data: {
		keyword: '',
		scale: 14,
		mapTop: 64,
		latitude: 39.90374,
		longitude: 116.397827,
		markers: [],
		markersFilter: null,
		onLoad: false,
		colors: app.data.mark.arr,
		colorNow: null,
		colorTop: 114,
		showColors: false,
	},
	onReady() {
		this.mapCtx = wx.createMapContext('map')
	},
	onLoad() {
		const navBar = app.data.navBar
		this.setData({
			mapTop: navBar.marginTop + navBar.height,
			colorTop: navBar.marginTop + navBar.height + 44,
		})
		this.initMarkers(() => {
			this.bindPoints()
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
				keyword: search.title || '',
				scale: search.scale || 14,
			})
		}
	},
	initMarkers(callback) {
		// 初始化打卡地点
		Sea.Ajax({
			url: '/v1/card.get',
		}).then(res => {
			if (res.ok && res.data.length) {
				const markers = res.data.map((e, i) => {
					const [latitude, longitude] = e.location.split(',')
					return {
						id: e.id,
						latitude: latitude,
						longitude: longitude,
						width: 26,
						height: 26,
						name: e.content,
						mark_color: Number(e.mark_color),
						iconPath: `./img/mark${e.mark_color}.png`,
					}
				})
				this.setData({
					markers: markers,
				})
				if (typeof callback === 'function') {
					callback()
				}
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
		if (this.data.markers.length) {
			this.mapCtx.includePoints({
				padding: [30],
				points: this.data.markers,
			})
		}
	},
	bindData() {
		Sea.path('/pages/data/data')
	},
	bindCard() {
		Sea.path('/pages/cardAdd/cardAdd')
	},
	bindShare() {
		Sea.path('/pages/share/share')
	},
	bindEdit() {
		this.setData({
			showColors: !this.data.showColors,
		})
	},
	bindColor(event) {
		let i = event.target.dataset.i
		let markersFilter = []
		if (this.data.colorNow === i) {
			i = null
		} else {
			for (const marker of this.data.markers) {
				if (marker.mark_color === i) {
					markersFilter.push(marker)
				}
			}
		}
		if (markersFilter.length === 0 || i === null) {
			markersFilter = null
		}
		this.setData({
			colorNow: i,
			markersFilter: markersFilter,
		})
	},
})
