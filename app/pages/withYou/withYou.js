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
    Sea.alert('即将上线，敬请期待')
  },
  initWithYou() {
    Sea.Ajax({
      url: '/v1/card.matcher',
    }).then((res) => {
      const users = []
      if (res.ok) {
        for (const e of res.data) {
          users.push({
            cardID: e.cardId,
            openid: e.openid,
            name: '测试用户',
            gender: '男',
            similarity: parseInt(e['匹配度'] * 100),
            city: Sea.formatCity(e.city),
            head:
              'http://statics03.qingmang.mobi/image/proxy/aHR0cHMlM0EvL3d4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9QaWFqeFNxQlJhRUlJN2EwY2ZIYVpmTDNiQ2pYbzF5WDFURzNSaWMxU3ZEOUdpY3VYR2ljemN3bk9ham9IR2plZGJ3bDlKRHBhQlFhTkpnUEIwaFFkcUJiOFEvMTMy',
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
