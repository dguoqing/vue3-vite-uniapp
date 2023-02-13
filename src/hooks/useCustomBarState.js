/**
 * 自定义状态栏的hooks 属性
 */
import { ref, getCurrentInstance, onMounted } from 'vue'

export const useCustomBarState = () => {
    const navTop = ref(0) //状态栏的paddingtop值
    const navHeight = ref(0) // 状态栏的高度
    const actualHeight = ref(0) //状态栏paddingtop  + 高度,主要用于设置自定义状态栏页面最大容器的marginTop值

    const { proxy } = getCurrentInstance()

    onMounted(() => {
        navTop.value = proxy.$StatusBar
        // #ifdef MP-WEIXIN
        navHeight.value = proxy.$CustomBar
        actualHeight.value = proxy.$StatusBar + proxy.$CustomBar
        // #endif
    })

    return {
        navTop,
        navHeight,
        actualHeight,
    }
}

export default useCustomBarState
