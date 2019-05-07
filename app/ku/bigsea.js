const log = console.log.bind(console, '>>>')
const config = {
  host: 'https://api.echo1999.com',
}
module.exports = {
  config: config,
  system: wx.getSystemInfoSync(),
  price(n) {
    return this.float(Number(n) / 100)
  },
  float(n) {
    return parseFloat(n.toFixed(10))
  },
  Ajax(request) {
    let req = {
      url: config.host + request.url,
      data: request.data || {},
      header: request.header || {},
      method: (request.method || 'GET').toUpperCase(),
    }
    req.data.token = wx.getStorageSync('token')
    req.header['Content-Type'] = 'application/json'
    return new Promise(function(success) {
      wx.request({
        url: req.url,
        data: req.data,
        header: req.header,
        method: req.method,
        success(res) {
          success(res.data)
        },
        fail(err) {
          if (err.errMsg === 'request:fail timeout') {
            Sea.tip('您的网络有点慢，请稍后尝试', null, 2500)
          }
        },
      })
    })
  },
  // 页面
  path(str, obj, redirectTo) {
    let query = ''
    if (typeof obj === 'object') {
      query = this.query(obj)
    }
    // 跳转页面
    if (typeof str === 'string') {
      // 补全 /
      if (str.slice(0, 5) == 'pages') {
        str = '/' + str
      }
      if (redirectTo === true) {
        wx.redirectTo({
          url: str + query,
        })
      } else {
        wx.navigateTo({
          url: str + query,
        })
      }
    }
  },
  // 后退
  back(n = 1) {
    let pages = getCurrentPages()
    // 销毁所有页面
    if (pages.length > 9) {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    } else {
      if (pages.length > n) {
        wx.navigateBack({
          delta: n,
        })
      } else {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    }
  },
  // search
  query(obj) {
    if (typeof obj === 'string') {
      let result = {}
      let i = obj.indexOf('?')
      if (i === -1) {
        return result
      } else {
        obj = obj.slice(i + 1)
      }
      for (let e of obj.split('&')) {
        let a = e.split('=')
        result[a[0]] = a[1]
      }
      return result
    } else {
      let arr = []
      for (let key in obj) {
        let val = obj[key]
        arr.push([key, val].join('='))
      }
      if (arr.length) {
        return '?' + arr.join('&')
      } else {
        return ''
      }
    }
  },
  // 换算 px
  px(number) {
    return (number * this.system.windowWidth) / 750
  },
  // 对象 判断
  has(obj, path) {
    if (obj && path) {
      const arr = path.split('.')
      for (const k of arr) {
        if (typeof obj === 'object' && k in obj) {
          obj = obj[k]
        } else {
          return false
        }
      }
      return Boolean(obj)
    }
  },
  // 加载
  loading(str, icon, time) {
    if (typeof str === 'string') {
      wx.showToast({
        title: str,
        mask: true,
        icon: icon || 'loading',
        duration: time || 6000,
      })
    } else {
      wx.hideToast()
    }
  },
  // 提示
  tip(str, icon, time) {
    icon = icon || ''
    let option = {
      title: str,
      mask: true,
      duration: time || 1500,
    }
    if (icon.split('.')[1]) {
      option.image = icon
    } else {
      option.icon = icon || 'none'
    }
    wx.showToast(option)
  },
}
