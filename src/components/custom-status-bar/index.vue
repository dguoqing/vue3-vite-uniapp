<template>
    <view class="custom-status-bar" :style="{ paddingTop: navTop + 'rpx', height: navHeight + 'px' }">
        <!-- 这里是状态栏 -->
        <text @click="onTitileClick">{{ title }}</text>
    </view>
</template>

<script>
import { onMounted, getCurrentInstance, reactive, toRefs, } from 'vue'
export default {
    name: 'CustomStatusBar',
    props: {
        title: {
            type: [String, Number],
            default: ''
        }
    },
    setup(props, { emit }) {

        const state = reactive({
            navTop: 0,
            navHeight: 40
        })
        console.log('customStatusBar', props)
        const { proxy } = getCurrentInstance()

        const onTitileClick = () => {
            emit('onTitileClick',)
        }


        onMounted(() => {
            console.log(proxy, proxy.$StatusBar)
            state.navTop = proxy.$StatusBar;
            // #ifdef MP-WEIXIN
            state.navHeight = proxy.$CustomBar
            // #endif
        })

        return { ...toRefs(state), onTitileClick }

    },
}
</script>
<style lang="scss" scoped>
.custom-status-bar {
    height: var(--status-bar-height);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 32rpx;
    height: 40px;
    background-color: #09f;
}
</style>