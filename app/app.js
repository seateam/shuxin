const Sea = require('./ku/bigsea.js')
App({
	data: {
		navBar: {
			height: '44',
			marginTop: '20',
		},
		search: {
			location: null,
			keyword: '',
		},
		mark: {
			arr: ['#F82727', '#E88536', '#F9EE33', '#32B16C', '#448ACA', '#8957A1'],
			now: 0,
		},
	},
	onLaunch() {
		this.initNavBar()
	},
	onShow() {},
	onHide() {},
	initNavBar() {
		const systemInfo = wx.getSystemInfoSync()
		const ios = /ios/i.test(systemInfo.system)
		this.data.navBar = {
			marginTop: systemInfo.statusBarHeight,
			height: ios ? 44 : 48,
		}
	},
})
