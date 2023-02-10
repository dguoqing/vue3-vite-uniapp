<template>
    <h2>数量：{{ testStore.count }}---{{ count }}</h2>
    <h2>姓名：{{ testStore.name }}---{{ name }}</h2>
    <h2>arr：{{ testStore.arr }}---{{ arr }}</h2>
    <h2>getter的使用：{{ testStore.count10 }}---{{ count10 }}</h2>
    <button @click="changeNum">修改数量</button>
</template>
<script >
import { useTestStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
import { toRefs } from 'vue'
export default {
    name: 'Test',
    setup() {
        const testStore = useTestStore()
        const { count, name, arr, count10 } = storeToRefs(testStore) //使用storeToRefs函数将state里的数据解构出来实现响应式
        function changeNum() {
            testStore.count++ //法1
            testStore.$patch({
                //法2：修改多个数据，用$patch
                count: testStore.count + 1,
                name: testStore.name + '!',
                arr: [...testStore.arr, 4],
            })
            testStore.$patch((state) => {
                //法3：$patch函数会批量更新
                state.count++
                state.name += '~~'
                state.arr.push(5)
            })
            testStore.changeState(10, 'hello') //法4：逻辑比较多时使用actions
        }
        return { count, name, arr, count10, testStore, changeNum }
    },
}
</script>