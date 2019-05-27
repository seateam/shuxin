Component({
  options: {
    addGlobalClass: false
  },
  data: {
    info: {}
  },
  properties: {
    info: {
      type: Object
    }
  },
  attached() {
    const info = this.dataset.info || {
      title: '完成购买需复制下方的网址, 并在浏览器中打开',
      url:
        'https://paper.dropbox.com/doc/Payment-draft--AYPh1dBRwggcGbjaY97JWj0kAg-bOiqHhc'
    }
    this.setData({
      info: info
    })
  },
  methods: {
    bindCopy() {
      wx.setClipboardData({
        data: this.data.info.url,
        success() {}
      })
    }
  }
})
