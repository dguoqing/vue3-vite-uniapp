import uviewPlus from 'uview-plus'
import {createPinia} from 'pinia' 
// import install from '@/components'
import {
	createSSRApp
} from "vue";
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	// install(app)
	app.use(createPinia())
	app.use(uviewPlus)
	return {
		app,
	};
}
console.log('process.env.VITE_APP_ENV',process.env.VITE_APP_ENV )