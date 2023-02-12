import uviewPlus from 'uview-plus'
import { createPinia } from 'pinia'
// import install from '@/components'
import {
	createSSRApp
} from "vue";
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	getSystemInfo(app)
	// install(app)
	app.use(createPinia())
	app.use(uviewPlus)
	return {
		app,
	};
}


function getSystemInfo(app) {
	uni.getSystemInfo({
		success: e => {
			console.log('getsysteminfo',e)
			// #ifdef MP-WEIXIN
			app.config.globalProperties.$StatusBar = e.statusBarHeight
			const custom = wx.getMenuButtonBoundingClientRect()
			console.log(custom)
			app.config.globalProperties.$Custom = custom
			app.config.globalProperties.$CustomBar = custom.bottom + custom.top - e.statusBarHeight
			// #endif
		}
	})
}
console.log('process.env.VITE_APP_ENV', process.env.VITE_APP_ENV)