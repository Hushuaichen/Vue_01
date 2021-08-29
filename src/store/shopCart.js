
//shopCart模块的vuex模块

import { reqAddOrUpdateShopCart, reqDeleteShopCart, reqShopCartInfo, reqUpdateCartIsChecked} from "@/api"

const state={
    shopCartInfo:[]
}

const mutations={
    RECEIVE_SHOPCARTINFO(state,shopCartInfo){
        state.shopCartInfo=shopCartInfo
    }
}
const actions={
    //async函数称作异步函数 一般内部都是有异步操作的
    //async函数的返回值 一定是promise 不看return
    //返回的promiose对象的成功和失败及结果 要看return  
    //return的结果如果是非Promise对象 那么一定是成功 成功的结果就是return的结果
    //return的结果如果是promise对象 那么要看这个return后面的promise对象是成功还是失败 如果成功 则成功 结果就是return的promise成功的结果 失败则相反
    //如果没有return结果而是抛出错误 promise也是失败的 原因就是抛出的错误原因
    async addAddOrUpdateShopCart({commit},{skuId,skuNum}) {
        const result = await reqAddOrUpdateShopCart(skuId,skuNum)
        // if(result.code===200){
        //     return 'ok'
        // }else{
        //     return 'failed'
        // }
        if(result.code===200){ 
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    async getShopCartInfo({commit}){
        const result =await reqShopCartInfo()
            if(result.code===200){
                commit('RECEIVE_SHOPCARTINFO',result.data)
            }
        },
    //修改购物车选中
    async updateCartIsChecked({commit},{skuId,isChecked}){
        const result=await reqUpdateCartIsChecked(skuId,isChecked)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //使用promise.all  采用单个修改的接口修改多个  实际中不是这么做 真正应该有一个修改多个的接口

    //promise.all是promise的一个api
    //功能： 批量处理promise对象
    //参数： promise对象的数组
    //返回值: 返回新的promise对象  新的promise对象是成功还是失败，只有当所有的promise对象都成功才成功 有一个失败就直接失败
                                //  成功的结果是参数是每个promise对象成功的结果组成的数组
                                // 失败的结果参数promise对象数组第一个失败的promise对象失败的原因
    updateCartIscheckedAll({commit,getters,dispatch},isChecked){
        let promises=[]
        //getters.cartInfo.cartInfoList获取的是购物车列表数据
        getters.cartInfo.cartInfoList.forEach(item=>{
            if(item.isChecked===isChecked) return  //购物车的数据和要改的数据一样时  就不用了改变了
            let promise = dispatch('updateCartIsChecked',{skuId:item.skuId,isChecked})
            promises.push(promise)
        })
            return Promise.all(promises)
    },
    //删除
    async deleteShopCart({commit},skuId){
        const result = await reqDeleteShopCart(skuId)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    deleteShopCartAll({commit,getters,dispatch}){
        let promises=[]
        getters.cartInfo.cartInfoList.forEach(item=>{
            if(!item.isChecked) return 
          let promise=  dispatch('deleteShopCart',item.skuId)
          promises.push(promise)

        })
        return Promise.all(promises)
    }
}
const getters={
    //简化数据的操作
      cartInfo(state){
        return state.shopCartInfo[0] ||{} //拿到的是购物车列表
      }
}

export default {
    state,
    mutations,
    actions,
    getters

}