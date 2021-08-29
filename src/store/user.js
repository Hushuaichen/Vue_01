
//user模块的vuex模块
import { reqGetCode, reqgetUserInfo, reqUserAddressList, reqUserLogin, reqUserLogout, reqUserRegister } from '@/api'
import {getUserTempId} from '@/utils/userabout'
const state={
    userTempId:getUserTempId(),   //这个函数专门用来生成用户的临时标识的    
    code:''  ,
    // token:'',
    token:localStorage.getItem('TOKEN_KEY'),
    userInfo:{},  //根据token获取用户信息
    userAddressList:[],
}


const mutations={
    RECEIVE_CODE(state,code){
        state.code=code
    },
    RECEIVE_TOKEN(state,token){
        state.token=token
    },
    RECEIVE_USERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    // RESET_TOKEN(state){
    //     state.token=''
    // },

    //退出登录需要清空用户信息和token
    RESET_USER(){
        state.token='',
        state.userInfo={}
    },
    RECEIVE_USERADDRESSLIST(state,userAddressList){
        state.userAddressList=userAddressList
    }
}
const actions={
   async userRegister({commit},userInfo){
       const result =await reqUserRegister(userInfo)
       if(result.code===200){
           return 'ok'
       }else{
           return Promise.reject(new Error('failed'))
       }
   },
    async getCode({commit},phone){
        const result = await reqGetCode(phone)
            if(result.code===200){
                commit('RECEIVE_CODE',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('failed'))
            }
        },
    async userLogin ({commit},userInfo){
        const result =await reqUserLogin(userInfo)
        if(result.code===200){
            commit('RECEIVE_TOKEN',result.data.token)  //获取的token 要存储到localstorage中 
            localStorage.setItem('TOKEN_KEY',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
        
    },
    async getUserInfo({commit}){
        const result = await reqgetUserInfo()
        if(result.code===200){
            commit('RECEIVE_USERINFO',result.data)
            return 'ok' 
        }else{
            return Promise.reject(new Error('failed'))
        }
    },

    //清除用户的token信息
    async clserToken({commit}){
        commit(' RESET_USER')
        localStorage.removeItem('TOKEN_KEY')  //token过期 需要把localstorage中的清除
    },

    //退出登录
    async userLogout({commit}){
        const result=await reqUserLogout()
        if(result.code===200){
            commit('RESET_USER')
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //获取用户收货地址
    async getUserAddressList({commit}){
        const result=await reqUserAddressList()
        if(result.code===200){
            commit('RECEIVE_USERADDRESSLIST',result.data)
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