const app = getApp()
const Sea = require('../../ku/bigsea')
const QQMapWX = require('../../ku/qqmap-wx-jssdk.js')
// 实例化API核心类
const qqmapsdk = new QQMapWX({
  key: '7FXBZ-CJRKF-L7KJI-J4RNO-YZ372-IYFDP'
})
Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 0,
      latitude: 23.099994,
      longitude: 113.344520,
      width: 22,
      height: 27,
      name: '鬼地方',
      iconPath: './img/mark.png'
    }, {
      id: 1,
      latitude: 23.099994,
      longitude: 113.304520,
      width: 22,
      height: 27,
      name: '鬼地方2',
      iconPath: './img/mark.png'
    }]
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('map')
  },
  onLoad() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              // wx.startRecord()
            }
          })
        }
      }
    })
  },
  onShow() {
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: '湖南安化', //用户输入的关键词，可设置固定值,如keyword:'KFC'
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success (res) { //搜索成功后的回调
        console.log(res);
      },
      fail (error) {
        console.error(error);
      },
      complete (res) {
        console.log(res);
      }
    });
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  bindLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  bindSearch () {
    Sea.path('/pages/search/search')
  },
  bindPoints () {
    this.mapCtx.includePoints({
      padding: [30],
      points: this.data.markers
    })
  },
  bindLogin() {
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          Sea.Ajax({
            url: '/v1/login',
            data: {
              js_code: res.code
            }
          }).then(res => {
            if (res.ok) {
              console.log('🐸', '登陆成功!')
              wx.setStorageSync('token', res.openid)
            }
          })
        } else {
          console.log('登录失败!' + res.errMsg)
        }
      }
    })
  },
  isLogin() {
    const token = wx.getStorageSync('token')
    if (token) {
      return true
    } else {
      this.bindLogin()
      return false
    }
  },
  bindData() {
    if (this.isLogin()) {
      Sea.path('/pages/data/data')
    }
  },
  bindCard() {
    if (this.isLogin()) {
      Sea.path('/pages/card/card')
    }
  },
  bindShare() {
    if (this.isLogin()) {
      Sea.path('/pages/share/share')
    }
  },
  // 刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
})