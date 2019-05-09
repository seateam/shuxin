const Sea = require('../../ku/bigsea.js')

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    system: 'ios',
    barHeight: '20',
  },
  attached() {
    const systemInfo = wx.getSystemInfoSync()
    const ios = /ios/i.test(systemInfo.system)
    const system = ios ? 'ios' : 'android'
    this.setData({
      system: system,
      barHeight: systemInfo.statusBarHeight,
    })
  },
  methods: {
    bindBack () {
      Sea.back()
    }
  }
})