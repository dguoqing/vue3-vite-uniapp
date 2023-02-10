
import { defineConfig } from 'vite'
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
    transpileDependencies: ['uview-plus'],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, 'src'),
            },
        ],
    },
    plugins: [uni()],
    define: {
        'process.env.VITE_APP_ENV': JSON.stringify(process.env.VITE_APP_ENV),
    },
})

console.log('配置', process.env.VITE_APP_ENV, process.env.NODE_ENV)