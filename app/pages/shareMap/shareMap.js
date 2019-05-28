import * as echarts from './ec-canvas/echarts'
import geoJson from './china.js'
import Sea from '../../packages/bigsea.js'
import Theme from './theme'
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
		ec: {
			onInit: chartInit,
		},
	},
	onLoad() {
		Sea.Ajax({
			url: '/v1/card.map',
			data: {
				openid: Sea.friendToken,
			},
		}).then(res => {
			if (res.ok) {
				setTimeout(() => {
					this.render(this.initData(res), this.initOption(res))
				}, 500)
			}
		})
	},
	initData(res) {
		const o = res.data[0]
		const arr = []
		for (const key in o) {
			arr.push({
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
	initOption(res) {
		const o = res.data[0]
		const arr = []
		for (const key in o) {
			arr.push(o[key])
		}
		return {
			max: Math.max(...arr),
			min: Math.min(...arr),
		}
	},
	render(data, option) {
		// https://echarts.baidu.com/option.html
		const options = {
			visualMap: {
				show: false,
				// min: option.min,
				// max: option.max,
				// left: '0',
				// bottom: '0',
				// padding: [5,5,10,5],
				// textStyle: {
				// 	fontSize: 14,
				// },
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
