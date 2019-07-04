const app = getApp()
const Sea = require('../../packages/bigsea.js')
Page({
  data: {
    topTip: false,
    users: [
      {
        name: '李小兔',
        gender: '女',
        similarity: 88,
        city: '日本',
        head:
          'http://statics03.qingmang.mobi/image/proxy/aHR0cHMlM0EvL3d4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9EWUFJT2dxODNlcEd4Y29SaWI5aWE3SGdXNWN3akdEbEZrdDhUVExxRmxKaHJtMm5oTmJaQUpkdUMzMlJpYjV1M29RTHBHWlEzSXMyQ09weFh3aWNjUmdNNEEvMTMy',
      },
      {
        name: 'LEMONed',
        gender: '男',
        similarity: 67,
        city: '广州',
        head:
          'http://statics03.qingmang.mobi/image/proxy/aHR0cCUzQS8vdGhpcmR3eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvRFlBSU9ncTgzZXBSNXI2eG53MWJXVm1rNno4NUNMRmpjMUhmOUV3Y1NhVkFQcWliZ3ljZmFYYnF2ZW90T2RCVVhNeWtkcGFjY0hOWGZtV1lOcG92OHVnLzEzMg==',
      },
      {
        name: '云天团',
        gender: '男',
        similarity: 98,
        city: '北京',
        head:
          'http://statics03.qingmang.mobi/image/proxy/aHR0cHMlM0EvL3d4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9QaWFqeFNxQlJhRUxyY2lhOUQ1NHJmQUIycXphRFlqb1ZJRXlpY2ljczRUdHFGcXJoNXgwaWN2NlA4R090OWxKazZpYmdxNXA1UmVNUlU2RzR5VHNZNlVQM0h1dy8xMzI=',
      },
      {
        name: '大海',
        gender: '男',
        similarity: 99,
        city: '西安',
        head:
          'http://statics03.qingmang.mobi/image/proxy/aHR0cHMlM0EvL3d4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9QaWFqeFNxQlJhRUlJN2EwY2ZIYVpmTDNiQ2pYbzF5WDFURzNSaWMxU3ZEOUdpY3VYR2ljemN3bk9ham9IR2plZGJ3bDlKRHBhQlFhTkpnUEIwaFFkcUJiOFEvMTMy',
      },
    ],
    userNow: 0,
  },
  onLoad() {
    // Sea.Ajax({
    //   url: '/v1/card.matcher',
    // }).then((res) => {
    //   console.log('🐸card.matcher', res)
    // })
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
})
