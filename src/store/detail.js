
//detail模块的vuex模块
import { reqDetailInfo } from "@/api"
const state={
    detailInfo:{}
    }


const mutations={
    RECEIVE_DETAILINFO(state,detailInfo){
        state.detailInfo=detailInfo
    }
}
const actions={
    async getDetailInfo({commit},skuId){
        const result =await reqDetailInfo(skuId)
        if(result.code===200){
            commit('RECEIVE_DETAILINFO',result.data)
        }
    }
}

const getters={
    //简化数据的操作
    categoryView(state){
        return state.detailInfo.categoryView || {}
    },
    skuInfo(state){
        //{}保证数据没获取回来的时候 传给组件的是空对象而不是undefined
        return state.detailInfo.skuInfo ||{}
    },
    spuSaleAttrList(state){
        return state.detailInfo.spuSaleAttrList ||[]
    }
}

export default {
    state,
    mutations,
    actions,
    getters

}