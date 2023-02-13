<script>
import { login } from './services/login.js'
export default {
    onLaunch: function () {
        console.log('App Launch')

        //登录
        uni.login({
            success: async res => {
                console.log(res, 'dfddddddddd')
                // const token = await login({
                //     code: res.code,
                // })

                // uni.setStorageSync('token', token.access_token)
            },
        })
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },
}
</script>

<style lang="scss">
/*每个页面公共css */
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-plus/index.scss';
</style>
