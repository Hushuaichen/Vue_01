import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'

//home模块的vuex模块
const state={//存数据
        categoryList:[],
        bannerList:[],
        floorList:[]
}


const mutations={//直接修改数据
    REVEIVE_CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    REVEIVE_BANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    REVEIVE_FLOORLIST(state,floorList){
        state.floorList=floorList
    },
}
const actions={//与组件中的用户对接   异步发请求   提交mutations    桥梁
       
    async  getCategoryList({commit}){
        const result =await  reqCategoryList()
        if(result.code===200){
            commit('REVEIVE_CATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}){
        const result=await reqBannerList()
        if(result.code===200){
            commit('REVEIVE_BANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){
        const result=await reqFloorList()
        if(result.code===200){
            commit('REVEIVE_FLOORLIST',result.data)
        }
    }
}

const getters={
    //简化数据的操作
}

export default {
    state,
    mutations,
    actions,
    getters

}