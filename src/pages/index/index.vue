<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">1231231</text>
		<!-- <u-button type="primary" loading loadingText="加载中"></u-button> -->
    <view>asdfafffffffffffffff</view>
    <custom-status-bar title="我是标题33" > </custom-status-bar>
    </view>
  </view>
</template>

<script>
import { onPageScroll, onLoad, onShow, onHide, onReachBottom,onNavigationBarButtonTap } from '@dcloudio/uni-app'
import { ref, onMounted } from "vue";
import CustomStatusBar from '@/components/custom-status-bar/index.vue'
export default {
  components:{
    CustomStatusBar,
  },
  setup() {

    onShow(() => {
      console.log('onShow')
    })
    onNavigationBarButtonTap((e) => {
       console.log('onNavigationBarButtonTap',e)
    })
    onMounted(() => {
      console.log("process.env.", process.env.VITE_APP_ENV);
    });
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  /* margin-top: 200rpx; */
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  /* display: flex;
  justify-content: center; */
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
