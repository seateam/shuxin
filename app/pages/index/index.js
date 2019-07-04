const Sea = require('../../packages/bigsea.js')
const app = getApp()
Page({
  data: {
    keyword: '',
    scale: 14,
    mapTop: 64,
    latitude: 39.90374,
    longitude: 116.397827,
    markers: [],
    markersFilter: null,
    onLoad: false,
    colors: app.data.mark.arr,
    colorNow: null,
    colorTop: 114,
    showColors: false,
  },
  onReady() {
    this.mapCtx = wx.createMapContext('map')
  },
  onLoad() {
    this.init()
    // this.init复制openID()
    // this.init评委()
  },
  init评委() {
    wx.showModal({
      title: '尊敬的评委:',
      content: '我们为您准备了一个体验用户，是否变身成为体验用户？',
      cancelText: '不用了',
      cancelColor: '#E88536',
      confirmText: '好的',
      confirmColor: '#448ACA',
      success: res => {
        if (res.confirm) {
          app.变身('不圆')
          this.init()
        }
      },
    })
  },
  init复制openID() {
    wx.login({
      success: res => {
        let code = res.code
        // 发起网络请求
        Sea.Ajax({
          url: '/v1/login',
          data: {
            js_code: code,
            openid: false,
          },
        }).then(res => {
          let openid = res.openid
          wx.showModal({
            title: '复制 openID 发给大海',
            content: openid,
            showCancel: false,
            success: res => {
              if (res.confirm) {
                wx.setClipboardData({
                  data: openid,
                })
              }
            },
          })
        })
      },
    })
  },
  onShow() {
    this.initSearch()
    this.initMarkers()
  },
  init() {
    const navBar = app.data.navBar
    this.setData({
      mapTop: navBar.marginTop + navBar.height,
      colorTop: navBar.marginTop + navBar.height + 44,
    })
    this.initMarkers(() => {
      this.bindPoints()
    })
  },
  initSearch() {
    const search = app.data.search
    if (search && search.location) {
      this.setData({
        latitude: search.location.lat,
        longitude: search.location.lng,
        keyword: search.title || '',
        scale: search.scale || 14,
      })
    }
  },
  initMarkers(callback) {
    // 初始化打卡地点
    Sea.Ajax({
      url: '/v1/card.get',
    }).then(res => {
      if (res.ok && res.data.length) {
        const markers = res.data.map((e, i) => {
          const [latitude, longitude] = e.location.split(',')
          return {
            id: e.id,
            latitude: latitude,
            longitude: longitude,
            width: 26,
            height: 26,
            name: Sea.formatContent(e.content),
            mark_color: Number(e.mark_color),
            iconPath: `./img/mark${e.mark_color}.png`,
          }
        })
        this.setData(
          {
            markers: markers,
          },
          () => {
            if (typeof callback === 'function') {
              callback()
            }
          },
        )
      }
    })
  },
  getCenterLocation() {
    this.mapCtx.getCenterLocation({
      success(res) {
        console.log(res)
      },
    })
  },
  bindLocation() {
    this.mapCtx.moveToLocation()
  },
  bindSearch() {
    Sea.path('/pages/search/search')
  },
  bindPoints() {
    if (this.data.markers.length) {
      this.mapCtx.includePoints({
        padding: [30],
        points: this.data.markers,
      })
    }
  },
  bindData() {
    Sea.path('/pages/data/data')
  },
  bindCard() {
    Sea.path('/pages/card/cardAdd')
  },
  bindShare() {
    Sea.path('/pages/share/share')
  },
  bindEdit() {
    this.setData({
      showColors: !this.data.showColors,
    })
  },
  bindColor(event) {
    let i = event.target.dataset.i
    let markersFilter = []
    if (this.data.colorNow === i) {
      return
    } else {
      for (const marker of this.data.markers) {
        if (marker.mark_color === i) {
          markersFilter.push(marker)
        }
      }
    }
    this.setData({
      colorNow: i,
      markersFilter: markersFilter,
    })
  },
  bindColorAll() {
    if (this.data.colorNow !== null || this.data.markersFilter !== null) {
      this.setData({
        colorNow: null,
        markersFilter: null,
      })
    }
  },
})
