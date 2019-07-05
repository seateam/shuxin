const app = getApp()
const Sea = require('../../packages/bigsea.js')
Page({
  data: {
    topTip: false,
    users: [],
    userNow: 0,
  },
  onLoad() {
    this.initWithYou()
  },
  initWithYou() {
    Sea.Ajax({
      url: '/v1/card.matcher',
    }).then((res) => {
      const users = []
      if (res.ok) {
        for (const e of res.data) {
          const userInfo = e.userInfo || {}
          const genderDict = {
            '0': '保密',
            '1': '男',
            '2': '女',
          }
          users.push({
            cardID: String(e.cardId).padStart(11, '0'),
            openid: e.openid,
            name: userInfo.nickName || '未知用户',
            gender: genderDict[userInfo.gender] || '保密',
            similarity: parseInt(e.match * 100),
            city: Sea.formatCity(e.city),
            head: userInfo.avatarUrl || './head.png',
          })
        }
        this.setData({
          users: users,
        })
      }
    })
  },
  bindTopTip() {
    this.setData({
      topTip: !this.data.topTip,
    })
  },
  bindOne(event) {
    this.setData({
      userNow: event.currentTarget.dataset.index,
    })
  },
  bindHisPaper() {
    const e = this.data.users[this.data.userNow]
    Sea.path('pages/card/card', {
      cardID: e.cardID,
      openid: e.openid,
    })
  },
  bindHisMap() {
    const e = this.data.users[this.data.userNow]
    Sea.path('pages/shareMap/shareMap', {
      openid: e.openid,
      name: e.name,
    })
  },
})
