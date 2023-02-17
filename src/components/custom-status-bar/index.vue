<template>
    <view class="custom-status-bar" :style="{ paddingTop: navTop + 'px', height: navHeight + 'px' }">
        <!-- 左侧返回按钮 -->
        <view class="custom-status-bar-left" v-if="isShowBackBtn">
            <slot v-if="$slots.left" name="left"></slot>

            <u-icon v-else @click="onBack" size="22" name="arrow-left" :color="color"></u-icon>
        </view>
        <!-- 这里是状态栏 -->
        <view class="custom-status-bar-titlebox" @click="onTitleClick" :style="{ color: color }">
            <view class="custom-status-bar-title">
                {{ title }}
            </view>
            <view v-if="isShowTitleIcon" class="custom-status-bar-title-icon">
                <slot v-if="$slots.titleIcon" name="titleIcon"></slot>

                <u-icon v-else size="20" name="arrow-down-fill" :color="color"></u-icon>
            </view>
        </view>
    </view>
</template>

<script>
import { onMounted, getCurrentInstance, reactive, toRefs } from 'vue'
import { useCustomBarState } from '@/hooks'
export default {
    name: 'CustomStatusBar',
    props: {
        title: {
            //标题的文字
            type: [String, Number],
            default: '',
        },
        color: {
            //标题和返回按钮的颜色（默认白色）
            type: [String],
            default: '#FFFFFF',
        },
        isShowBackBtn: {
            //是否显示返回按钮
            type: [Boolean],
            default: true,
        },
        isShowTitleIcon: {
            //标题后面是否有icon
            type: [Boolean],
            default: false,
        },
    },
    setup(props, { emit }) {
        const { navTop, navHeight } = useCustomBarState()

        console.log('customStatusBar', props)

        const onTitleClick = () => {
            emit('onTitleClick')
        }

        const onBack = () => {
            console.log('onBack')
            emit('onBack')
        }

        return { navTop, navHeight, onTitleClick, onBack }
    },
}
</script>
<style lang="scss" scoped>
.custom-status-bar {
    display: flex;
    align-items: center;
    // height: var(--status-bar-height);
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
    &-left {
        position: absolute;
        left: 20rpx;
    }
    &-title {
        font-size: 36rpx;
    }

    &-titlebox {
        display: flex;
        align-items: center;
    }
    &-title-icon {
        margin-left: 5rpx;
    }
}
</style>