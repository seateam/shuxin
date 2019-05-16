const app = getApp()
const Sea = require('../../ku/bigsea.js')
Page({
  data: {
    province: [
      '河南',
      '河北',
      '北京',
      '湖南',
      '湖北',
      '广东',
      '黑龙江',
      '山西',
      '四川',
      '陕西',
    ],
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
  },
  onLoad() {
    const cards = []
    for (let i = 0; i < 100; i++) {
      cards.push({
        content: '猎户，天狼，织女。光年外沉默。光年外沉默',
        date: '7/2',
        city: '深圳',
      })
    }
    this.setData({
      cards: cards,
    })
  },
  onShow() { },
  bindProvince(event) {
    this.setData({
      provinceNow: event.currentTarget.dataset.i
    })
  },
  bindMonth(event) {
    this.setData({
      dateNow: event.currentTarget.dataset.arr
    })
  },
  bindAllMonth() {
    this.setData({
      dateNow: 'all'
    })
  },
  bindAllProvince() {
    this.setData({
      provinceNow: 'all'
    })
  },
})
