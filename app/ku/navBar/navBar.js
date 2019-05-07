const Sea = require('../../ku/bigsea')

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
    const ios = !systemInfo.system.startsWith('Android')
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