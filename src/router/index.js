import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import store from '@/store'

import routes from './routes'

const originPush=VueRouter.prototype.push
VueRouter.prototype.push=function(location,onResolved,onRejected){
        //location就是调用push传递过来的对象
    if(onResolved===undefined &&onRejected===undefined){
        return originPush.call(this,location).catch(()=>{})
    }else{
        return originPush.call(this,location,onResolved,onRejected)
    }
}

const originReplace=VueRouter.prototype.replace
VueRouter.prototype.replace=function(location,onResolved,onRejected){
    if(onResolved===undefined &&onRejected===undefined){
        return originReplace.call(this,location).catch(()=>{})
    }else{
        return originReplace.call(this,location,onResolved,onRejected)
    }
}


 const router=new VueRouter({
        routes,
        scrollBehavior(to,from,savedPosition){  //配置滚动行为 跳转到新的路由界面  滚动到顶部
            return {x:0,y:0}
        }

})
//注册全局前置导航守卫 用来对token校验 （根据token获取用户信息）
router.beforeEach(async (to,from,next)=>{
    //to代表跳转的目的地路由对象
    //from 从哪来的来的路由对象
    //next  是一个函数 根据参数不同 功能不同  next()代表无条件放行   next('/')代表强制跳转到指定的位置    next(false) 代表什么都不做，原地不动
    

    //第一步 守卫拦截住 先去获取用户的token和用户的信息
    let token =store.state.user.token
    let userInfo=store.state.user.userInfo.name
    if(token){
        //如果token代表用户登陆过 
        if(to.path==='/login'){  //用户已经登录了 还要往登录页面去跳 没必要
            next('/')
        }else{
            if(userInfo){  //如果用户已经登录了 但是跳转的不是登录页  那么我们得看用户的信息获取了没有
                //如果用户的信息已经获取 无条件放行
                next()
            }else{
                //用户已经登录 但是还没有获取用户信息 请求获取用户信息
                try {
                await store.dispatch('getUserInfo')  //根据token获取用户信息 
                next()   //获取用户信息成功 无条件放行1
                } catch (error) {
                   //获取信息失败 代表token可能过期
                   //把用户的过期token给清理掉 重新跳转到登录页面
                   store.dispatch('clserToken')   //清理掉token
                   next('/login')   //重新跳转到登录页面
                }
            }
        }
    }else{
        //用户根本没登录
        // next()
        let targetPath = to.path
        if(targetPath.indexOf('/trade')!==-1 || targetPath.indexOf('/pay')!==-1 || targetPath.startsWith('/center')){
            next('/login?redirect='+targetPath)
        }else{
            next()
        }
    }
})
export default router