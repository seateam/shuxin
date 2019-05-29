import * as echarts from '../../packages/ec-canvas/echarts'
import geoJson from './china.js'
import Sea from '../../packages/bigsea.js'
import Theme from './theme.js'
let chart = {}
const chartInit = function(canvas, width, height) {
	echarts.registerTheme('shine', Theme)
	chart = echarts.init(canvas, 'shine', {
		width: width,
		height: height,
	})
	canvas.setChart(chart)
	echarts.registerMap('china', geoJson)
	return chart
}
Page({
	data: {
		res: null,
		info: {
			city_count: 0,
			clock_count: 0,
			proportion: 0,
			proportion_string: 0,
			province_count: 0,
		},
		ec: {
			onInit: chartInit,
		},
		citys: [],
		province_count: 1,
	},
	onLoad() {
		Sea.Ajax({
			url: '/v1/card.map',
			data: {
				openid: Sea.friendToken,
			},
		}).then(res => {
			if (res.ok) {
				this.data.res = res
				setTimeout(() => {
					this.render(res)
				}, 500)
			}
		})
	},
	onReady() {
		setTimeout(() => {
			chart.on('mousedown', event => {
				const { data } = event
				let citys = []
				let province_count = 1
				if (data && this.data.res) {
					const province = this.data.res.data[1]
					citys = province[data.key].map(e => Sea.formatCity(e))
					const province2 = this.data.res.data[2]
					province_count = province2[data.key]
				}
				this.setData({
					citys: citys,
					province_count: province_count,
				})
			})
		}, 500)
	},
	initData(res) {
		const o = res.data[2]
		const arr = []
		for (const key in o) {
			arr.push({
				key: key,
				name: Sea.formatProvince(key),
				value: o[key],
			})
		}
		return arr
		// const randomValue = function() {
		// 	return Math.round(Math.random() * 15)
		// }
		// return [
		// 	{ name: '北京', value: randomValue() },
		// 	{ name: '天津', value: randomValue() },
		// 	{ name: '上海', value: randomValue() },
		// 	{ name: '重庆', value: randomValue() },
		// 	{ name: '河北', value: randomValue() },
		// 	{ name: '河南', value: randomValue() },
		// 	{ name: '云南', value: randomValue() },
		// 	{ name: '辽宁', value: randomValue() },
		// 	{ name: '黑龙江', value: randomValue() },
		// 	{ name: '湖南', value: randomValue() },
		// 	{ name: '安徽', value: randomValue() },
		// 	{ name: '山东', value: randomValue() },
		// 	{ name: '新疆', value: randomValue() },
		// 	{ name: '江苏', value: randomValue() },
		// 	{ name: '浙江', value: randomValue() },
		// 	{ name: '江西', value: randomValue() },
		// 	{ name: '湖北', value: randomValue() },
		// 	{ name: '广西', value: randomValue() },
		// 	{ name: '甘肃', value: randomValue() },
		// 	{ name: '山西', value: randomValue() },
		// 	{ name: '内蒙古', value: randomValue() },
		// 	{ name: '陕西', value: randomValue() },
		// 	{ name: '吉林', value: randomValue() },
		// 	{ name: '福建', value: randomValue() },
		// 	{ name: '贵州', value: randomValue() },
		// 	{ name: '广东', value: randomValue() },
		// 	{ name: '青海', value: randomValue() },
		// 	{ name: '西藏', value: randomValue() },
		// 	{ name: '四川', value: randomValue() },
		// 	{ name: '宁夏', value: randomValue() },
		// 	{ name: '海南', value: randomValue() },
		// 	{ name: '台湾', value: randomValue() },
		// 	{ name: '香港', value: randomValue() },
		// 	{ name: '澳门', value: randomValue() },
		// ]
	},
	initInfo(res) {
		let info = res.data[0]
		info = Object.assign(info, {
			proportion_string: parseFloat((info.proportion * 100).toFixed(2)),
		})
		this.setData({
			info: info,
		})
	},
	render(res) {
		this.initInfo(res)
		const data = this.initData(res)
		// https://echarts.baidu.com/option.html
		const options = {
			visualMap: {
				show: false,
			},
			geo: {
				map: 'china',
				// 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
				roam: true,
				zoom: 1,
				scaleLimit: {
					max: 4,
					min: 1,
				},
			},
			series: [
				{
					name: 'map',
					type: 'map',
					geoIndex: 0,
					data: data,
				},
			],
		}
		chart.setOption(options)
	},
})
