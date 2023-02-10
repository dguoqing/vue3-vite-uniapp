//pina示例

import {defineStore,acceptHMRUpdate} from "pinia";
//参数1：定义一个仓库的唯一id名，Pinia会将所有的容器挂载到根容器；参数2：选项对象
export const useTestStore =  defineStore('test',{
  state:()=>{//state必须是函数，是避免在服务端渲染时的交叉请求导致的状态数据污染；必须是箭头函数，为了更好的TS类型推导
    return{
      count:10,
      name:'wl',
      arr:[1,2,3],
    }
  },
    getters:{
        //函数接受一个可选参数:state
    count10(state){return state.count + 10}
        /*count10():number{   //在TS文件下，getters使用了this,则必须指定类型，否则会导致推导错误
          return this.count += 12
        }*/
    },
    actions:{
      changeState(num,str){   //不要使用箭头函数定义action,因为箭头函数绑定外部this
          this.count += num     
          this.name += str
          this.arr.push(5)          
          // this.$patch({})或this.$patch(state=>{})    //还可通过$patch修改state的数据
      }
    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useTestStore,import.meta.hot))
}
