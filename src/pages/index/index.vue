<template>
  <view class="container">
    <custom-status-bar title="我是自定义标题" @onTitleClick="onTitleClick" :isShowTitleIcon="true">
      <template v-slot:left>
       <u-icon size="22" name="photo"></u-icon>
      </template>
    </custom-status-bar>
    <view class="content">
      <image class="logo" src="/static/logo.png"></image>
      <view class="text-area">
        <text class="title">1231231</text>
      <u-button type="primary" loading loadingText="加载中"></u-button>
      </view>
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

    const onTitleClick = () => {
      uni.navigateTo({
        url:'/pages/other/index'
      })
    }

    onShow(() => {
      console.log('onShow')
    })
    onNavigationBarButtonTap((e) => {
       console.log('onNavigationBarButtonTap',e)
    })
    onMounted(() => {
      console.log("process.env.", process.env.VITE_APP_ENV);
    });


    return {
      onTitleClick
    }
  },
};
</script>

<style>
.container{
  position: relative;
  margin-top: 169rpx;
}
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
  /* margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx; */
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
