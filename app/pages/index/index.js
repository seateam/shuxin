const Sea = require('../../ku/bigsea.js')
const app = getApp()
const QQMapWX = require('../../ku/qqmap-wx-jssdk.js')
// 实例化API核心类
const qqmapsdk = new QQMapWX({
	key: '7FXBZ-CJRKF-L7KJI-J4RNO-YZ372-IYFDP',
})
Page({
	data: {
		keyword: '',
		mapTop: 64,
		latitude: 23.099994,
		longitude: 113.32452,
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
		//
		Sea.Ajax({
			url: '/v1/card.get',
			data: {
				// 必填
				// openid : '',
				// id: '',
				// 若有月份 则必填
				// year,
				// month,
				// province,
			},
		}).then(res => {
			// {
			// 	id: 'dudududu',
			// 	year: '2019',
			// 	month: '05',
			// 	province: '广东',
			// 	mark_color: '1',
      //  content: 'dudududu',
      //  // 原封不动
			// 	location: '34.34149,108.9397',
			// 	time_stamp: '1557486178644',
			// }
			if (res.ok) {
				console.log('🐸', res.data)
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
	bindLogin() {
		wx.login({
			success(res) {
				if (res.code) {
					// 发起网络请求
					Sea.Ajax({
						url: '/v1/login',
						data: {
							js_code: res.code,
						},
					}).then(res => {
						if (res.ok) {
							console.log('🐸', '登陆成功!')
							wx.setStorageSync('token', res.openid)
						}
					})
				} else {
					console.log('登录失败!' + res.errMsg)
				}
			},
		})
	},
	isLogin() {
		const token = wx.getStorageSync('token')
		if (token) {
			return true
		} else {
			this.bindLogin()
			return false
		}
	},
	bindData() {
		if (this.isLogin()) {
			Sea.path('/pages/data/data')
		}
	},
	bindCard() {
		if (this.isLogin()) {
			Sea.path('/pages/card/card')
		}
	},
	bindShare() {
		if (this.isLogin()) {
			Sea.path('/pages/share/share')
		}
	},
	// 刷新
	onPullDownRefresh() {
		wx.stopPullDownRefresh()
	},
})
