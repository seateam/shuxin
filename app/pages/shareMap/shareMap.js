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
		friendName: '',
	},
	onLoad(option) {
		Sea.loading('正在加载')
		if (option.openid) {
			this.setData({
				friendName: option.name || '未知用户'
			})
		}
		Sea.Ajax({
			url: '/v1/card.map',
			data: {
				openid: option.openid || '',
			},
		}).then(res => {
			if (res.ok) {
				this.data.res = res
				setTimeout(() => {
					this.render(res)
				}, 1000)
			} else {
				Sea.alert('您还没有打卡')
				Sea.loading()
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
		}, 1000)
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
	initOption(res) {
		const arr = []
		for (const key in res.data[2]) {
			arr.push(res.data[2][key])
		}
		return {
			max: Math.max(...arr),
			min: Math.min(...arr),
		}
	},
	render(res) {
		this.initInfo(res)
		const option = this.initOption(res)
		const data = this.initData(res)
		// https://echarts.baidu.com/option.html
		const options = {
			visualMap: {
				show: false,
				min: option.min === option.max ? 0 : option.min,
				max: option.max,
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
		Sea.loading()
	},
})
