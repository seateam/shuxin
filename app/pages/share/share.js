const app = getApp()
const Sea = require('../../ku/bigsea.js')
let Countdown = null
Page({
	data: {
		shareIndex: 0,
		yearsIndex: 0,
		years: [],
		data: [],
		imgUrls: [
			'http://cdn.bigc.cc//blue_tide/img/share1.jpg',
			'http://cdn.bigc.cc//blue_tide/img/share2.jpg',
			'http://cdn.bigc.cc//blue_tide/img/share3.jpg',
			'http://cdn.bigc.cc//blue_tide/img/share4.jpg',
		],
		contents: [
			// {
			// 	type: 'h2',
			// 	div: [
			// 		[
			// 			{
			// 				cont: '你一共打卡',
			// 			},
			// 			{
			// 				type: 'span',
			// 				cont: ' 16 ',
			// 			},
			// 			{
			// 				cont: '次',
			// 			},
			// 		],
			// 		[
			// 			{
			// 				cont: '脚印留在',
			// 			},
			// 			{
			// 				type: 'span',
			// 				cont: ' 9 ',
			// 			},
			// 			{
			// 				cont: '个城市',
			// 			},
			// 		],
			// 	],
			// },
		],
	},
	onLoad(option) {
		if (option.friendToken) {
			Sea.friendToken = option.friendToken
		}
		Sea.Ajax({
			url: '/v1/card.share',
			data: {
				openid: Sea.friendToken,
			},
		}).then(res => {
			if (res.ok && res.data && res.data.length) {
				// 处理省份
				const data = this.initCity(res.data).reverse()
				const years = data.map(e => e.year)
				Sea.shareYear = years[0]
				this.data.data = data
				this.setData(
					{
						years: years,
					},
					() => {
						this.initData(data[this.data.yearsIndex])
					},
				)
			} else {
				console.log('🐸', res)
				Sea.alert('您还没有打卡')
			}
		})
	},
	onShow() {},
	initCity(data) {
		// 处理省份
		for (const e of data) {
			for (const key in e) {
				if (typeof e[key] === 'string') {
					e[key] = Sea.formatCity(e[key])
				}
			}
		}
		return data
	},
	initData(data) {
		// 保留字符 , # [ ]
		const arr = []
		if (data.clock_count && data.city_count) {
			arr.push(`h2#你一共打卡[span, ${data.clock_count} ]次`)
			arr.push(`脚印留在[span, ${data.city_count} ]个城市#`)
		}
		if (data.city_most && data.clock_most) {
			arr.push(`h2#[span,${data.city_most}]一定是一个特别的地方`)
			arr.push(`你共计在这里标记多达[span, ${data.clock_most} ]次#`)
		}
		if (data.spring_visit) {
			arr.push(`h2#当春日被揉进夹着露水的清晨`)
			arr.push(`你在[span,${data.spring_visit}]的蕴酝春风中醒来#`)
		}
		if (data.summer_visit) {
			arr.push(`h2#当夏日的树梢紧紧拥抱着绿叶`)
			arr.push(`你在[span,${data.summer_visit}]照顾着历代星辰#`)
		}
		if (data.autumn_visit) {
			arr.push(`h2#在落叶亲吻地面的深秋`)
			arr.push(`你在[span,${data.autumn_visit}]是否见到圆月又昼眠听雨#`)
		}
		if (data.winter_visit) {
			arr.push(`h2#在阳光珍贵、风很清澈的冬日`)
			arr.push(`你到过的[span,${data.winter_visit}]下雪了吗？#`)
		}
		let i = 1
		Countdown = setInterval(() => {
			if (i <= arr.length) {
				this.setData({
					contents: this.initContents(arr.slice(0, i)),
				})
				i++
			} else {
				clearInterval(Countdown)
			}
		}, 1500)
	},
	initContents(data) {
		// 处理数组
		const contents = []
		let div = []
		data.forEach((e, i) => {
			const arr = e.split('#')
			const s = arr[1] || arr[0]
			if (arr[0] === 'h1') {
				console.log('处理 h1')
			} else {
				s.split('，').forEach(e => {
					const s2 = e.replace(/\[(.+)\]/, '|$1|').split('|')
					const arr = []
					s2.forEach(e => {
						const arr2 = e.split(',')
						const type = arr2[0]
						if (type === 'span') {
							arr.push({
								type: 'span',
								cont: arr2[1],
							})
						} else {
							arr.push({
								cont: arr2[0],
							})
						}
					})
					div.push(arr)
				})
				if (arr[arr.length - 1] === '' || i + 1 === data.length) {
					contents.push({
						type: 'h2',
						div: div,
					})
					// 清空
					div = []
				}
			}
		})
		return contents
	},
	bindNext() {
		let i = this.data.shareIndex + 1
		if (i === this.data.imgUrls.length) {
			i = 0
		}
		this.setData({
			shareIndex: i,
		})
	},
	bindChange(event) {
		this.data.shareIndex = event.detail.current
	},
	bindHoliday() {
		Sea.path('/pages/holiday/holiday')
	},
	bindYear() {
		this.setData({
			contents: [],
		})
		clearInterval(Countdown)
		let next = this.data.yearsIndex + 1
		if (next < this.data.years.length) {
		} else {
			next = 0
		}
		// 分享页年份
		Sea.shareYear = this.data.years[next]
		this.setData(
			{
				yearsIndex: next,
			},
			() => {
				this.initData(this.data.data[next])
			},
		)
	},
	bindMap() {
		Sea.path('/pages/shareMap/shareMap')
	},
	onShareAppMessage() {
		const token = wx.getStorageSync('token')
		return {
			title: '组长！不圆！这里的文案',
			path: '/pages/share/share?friendToken=' + token,
		}
	},
})
