const app = getApp()
const Sea = require('../../ku/bigsea.js')
const QQMapWX = require('../../ku/qqmap-wx-jssdk.js')
const QQMap = new QQMapWX({
	key: '7FXBZ-CJRKF-L7KJI-J4RNO-YZ372-IYFDP',
})
Page({
	data: {
		list: [],
		keyword: '',
	},
	onLoad() {},
	onShow() {
		const keyword = app.data.search.keyword
		this.setData({
			keyword: keyword,
		})
		this.initSug(keyword)
	},
	initSug(keyword) {
		if (keyword) {
			QQMap.getSuggestion({
				keyword: keyword,
				//region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
				success: res => {
					this.setData({
						list: res.data,
					})
				},
			})
		} else {
			this.setData({
				list: [],
			})
		}
	},
	bindInput(event) {
		const v = event.detail.value
		this.data.keyword = v
		this.initSug(v)
	},
	bindOne(event) {
		const i = event.currentTarget.dataset.i
		const e = this.data.list[i]
		const keyword = this.data.keyword
		app.data.search = {
			location: e.location,
			title: e.title,
			keyword: keyword,
		}
		Sea.back()
	},
})
