import uviewPlus from 'uview-plus'
import {createPinia} from 'pinia' 
import {
	createSSRApp
} from "vue";
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	app.use(createPinia())
	app.use(uviewPlus)
	return {
		app,
	};
}
console.log('process.env.VITE_APP_ENV',process.env.VITE_APP_ENV )