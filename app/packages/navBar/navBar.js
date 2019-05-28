const Sea = require('../../packages/bigsea.js')
const app = getApp()
Component({
	options: {
		addGlobalClass: false,
	},
	data: {
		navBar: app.data.navBar,
	},
	attached() {},
	methods: {
		bindBack() {
			Sea.back()
		},
	},
})
