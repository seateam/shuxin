const Sea = require('../../packages/bigsea.js')
const app = getApp()
Component({
	options: {
		addGlobalClass: false,
	},
	properties: {
		theme: {
			type: String,
		},
	},
	observers: {
		theme (value) {
			console.log('🐸', value)
		}
	},
	data: {
		navBar: app.data.navBar,
	},
	attached () {
		console.log('🐸', this.data.theme)
	},
	methods: {
		bindBack () {
			Sea.back()
			console.log('🐸', this.data.theme)
		},
	},
})
