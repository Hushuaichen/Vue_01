import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'


const originPush=VueRouter.prototype.push
VueRouter.prototype.push=function(location,onResolved,onRejected){
    if(onResolved===undefined &&onRejected===undefined){
        return originPush.call(this,location).catch(()=>{})
    }else{
        return originPush.call(this,location,onResolved,onRejected)
    }
}

const originReplace=VueRouter.prototype.replace
VueRouter.prototype.push=function(location,onResolved,onRejected){
    if(onResolved===undefined &&onRejected===undefined){
        return originReplace.call(this,location).catch(()=>{})
    }else{
        return originReplace.call(this,location,onResolved,onRejected)
    }
}


export default new VueRouter({
        routes:[
            {
                path:'/home',
                component:Home
            },
            {
                path:'/search',
                component:Search,
                name:'search',
               
            },
            {
                path:'/login',
                component:Login,
                meta:{
                    isHidden:true
                }
            },
            {
                path:'/register',
                component:Register,
                meta:{
                    isHidden:true
                    }
            },
            {
                path:'/',
                redirect:'/home'   //重定向
            }
        ]

})