const app = getApp()
const Sea = require('../../ku/bigsea.js')
const moment = require('../../ku/moment.js')
const request = {
  id: null,
  year: null,
  month: null,
  province: null,
}
Page({
  data: {
    colors: app.data.mark.arr,
    province: [],
    provinceNow: 'all',
    date: [
      {
        year: 2019,
        month: [5, 4, 3, 2, 1],
      },
      {
        year: 2018,
        month: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
      {
        year: 2017,
        month: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
      {
        year: 2016,
        month: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
    ],
    dateNow: 'all',
    cards: [
      {
        content: '想了你一整夜，再也想不起你的脸再也想不起你的脸',
        date: '7/1',
        city: '深圳',
      },
      {
        content: '猎户，天狼，织女。光年外沉默。光年外沉默',
        date: '7/2',
        city: '深圳',
      },
    ],
    cardLength: 0,
  },
  onLoad() {
    const cards = []
    Sea.Ajax({
      url: '/v1/card.get',
    }).then(res => {
      if (res.ok && res.data.length) {
        const province = this.initProvince(res)
        this.setData({
          province: province,
          provinceShow: province.map(e => this.formatProvince(e)),
          date: this.initDate(res),
          cardLength: res.data.length,
          cards: this.initCards(res),
        })
      }
    })
  },
  onShow() {
    this.render()
  },
  initProvince(res) {
    const arr = ['省', '自治区']
    const result = res.data.map(e => e.province)
    return Array.from(new Set(result))
  },
  formatProvince(province) {
    const arr = ['省', '自治区', '市']
    for (const e of arr) {
      if (province.endsWith(e)) {
        return province.replace(e, '')
      }
    }
    return province
  },
  formatCity(city) {
    const arr = ['市', '自治州', '州', '地区', '盟', '县']
    for (const e of arr) {
      if (city.endsWith(e)) {
        return city.replace(e, '')
      }
    }
  },
  initDate(res) {
    const o = {}
    for (const e of res.data) {
      if (o[e.year]) {
        o[e.year].push(e.month)
      } else {
        o[e.year] = []
        o[e.year].push(e.month)
      }
    }
    const arr = []
    Object.keys(o)
      .map(e => Number(e))
      .sort((a, b) => a < b)
      .forEach(e => {
        const month = o[e].map(e => Number(e))
        arr.push({
          year: e,
          month: Array.from(new Set(month)).reverse(),
        })
      })
    return arr
  },
  initCards(res) {
    return res.data.map(e => {
      const date = moment(Number(e.time_stamp))
      return {
        content: e.content,
        date: date.format('YYYY-MM-DD'),
        city: this.formatCity(e.city),
        id: e.id,
        mark_color: e.mark_color,
      }
    })
  },
  bindCard(event) {
    const id = event.currentTarget.dataset.id
    Sea.path('/pages/card/card', {
      cardID: id,
    })
  },
  bindProvince(event) {
    const i = event.currentTarget.dataset.i
    if (this.data.provinceNow === i) {
      this.bindAllProvince()
      return
    }
    this.setData({
      provinceNow: i,
    })
    request.province = this.data.province[i]
    this.render()
  },
  bindMonth(event) {
    const arr = event.currentTarget.dataset.arr
    const dateNow = this.data.dateNow
    if (dateNow[0] === arr[0] && dateNow[1] === arr[1]) {
      this.bindAllMonth()
      return
    }
    const date = this.data.date[arr[0]]
    const year = date.year
    const month = date.month[arr[1]]
    request.year = String(year)
    request.month = String(month).padStart(2, '0')
    this.render()
    this.setData({
      dateNow: arr,
    })
  },
  bindAllMonth() {
    request.year = null
    request.month = null
    this.render()
    this.setData({
      dateNow: 'all',
    })
  },
  bindAllProvince() {
    request.province = null
    this.render()
    this.setData({
      provinceNow: 'all',
    })
  },
  render() {
    const data = {}
    for (const key in request) {
      const e = request[key]
      if (e) {
        data[key] = e
      }
    }
    Sea.Ajax({
      url: '/v1/card.get',
      data: data,
    }).then(res => {
      if (res.ok) {
        this.setData({
          cards: this.initCards(res),
        })
      }
    })
  },
})
