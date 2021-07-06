import { reqSearchInfo } from "@/api"

const state={
    searchInfo:[]
}


const mutations={
    RECEIVE_SEARCHINFO(state,searchInfo){
    state.searchInfo=searchInfo
    }
}
const actions={
    async getSearchInfo({commit},searchParams){
        const result = await reqSearchInfo(searchParams)  
        if(result.code===200){
            commit('RECEIVE_SEARCHINFO',result.data)
        }
    }
}

const getters={
    //简化数据的操作  获取的数据内部结构比较复杂 使用起来不方便  甚至出现小问题（假报错）
    attrsList(state){
        return state.searchInfo.attrsList||[]  //为了后期不出现假报错 所以给[]
    },
    goodsList(state){
        return state.searchInfo.goodsList||[]
    },
    trademarkList(state){
        return state.searchInfo.trademarkList||[]
    }

}

export default {
    state,
    mutations,
    actions,
    getters,
}