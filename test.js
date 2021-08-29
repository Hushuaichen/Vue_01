import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const request = axios.create({
    baseURL:'',
    timeout:10000
})
request.interceptors.request.use(
    function(config){
        NProgress.start();
        config.headers.userTempId = userTempId
        config.headers.token = token
        return config
    }

)
request.interceptors.response.use(
    function(response){
        NProgress.done();
        return response.data
    },
)
export default request

import request from ''
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>{
  return request ({
    url:'/ / /${skuId}/${skuNum}',
    method:'post'
  })
}

import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import store from '@/store'
Vue.use(Vuex)


const state = {

},
const mutations = {

},
const actions = {
    async AddOrUpdateShopCart({commit},{skuId,skuNum}){
        const result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    }
},
const getters = {

}
 export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{

    }
})


this.$store.dispatch('',{skuId,skuNum})





router.beforeEach((to,from,next)=>{
    let token = store.state.userTempId.token
    let userInfo = store.state.userInfo.userInfo.name
    if(token){
        if(to.path==='/login'){
            next('/')
        }else{
            if(userInfo){
                next()
            }else{
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    store.dispatch('clserToken')
                    next('/login')
                }
            }
        }
    }else{
        next()
    }
})