const app = getApp()
const Sea = require('../../ku/bigsea.js')
Page({
	data: {
		shareIndex: 1,
		yearsIndex: 0,
		years: ['2019', '2018', '2017', '2016'],
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
	onLoad() {
		Sea.Ajax({
			url: '/v1/card.share',
		}).then(res => {
			if (res.ok) {
				const data = Object.assign(res.data[0], res.data[1])
				this.initData(data)
			}
		})
	},
	onShow() {},
	initData(data) {
		// 处理省份
		for (const key in data) {
			if (typeof data[key] === 'string') {
				data[key] = Sea.formatCity(data[key])
			}
		}
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
		const time = setInterval(() => {
			if (i <= arr.length) {
				this.setData({
					contents: this.initContents(arr.slice(0, i)),
				})
				i++
			} else {
				clearInterval(time)
			}
		}, 2000)
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
		} else {
			next = 0
		}
		this.setData({
			yearsIndex: next,
		})
	},
})
