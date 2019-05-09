const Sea = require('../../ku/bigsea.js')
const app = getApp()
Component({
	options: {
		addGlobalClass: true,
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
