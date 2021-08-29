//接口请求函数

import axios from 'axios'
import request from './ajax'
import mockAjax from '@/api/mockAjax'
export const reqCategoryList=()=>{
    return request({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}
// reqCategoryList() 

//请求获取模拟接口的数据
export const reqBannerList=()=>{
    return mockAjax({
        url:'/banner',
        method:'get'
    })
}

export const reqFloorList=()=>{
    return mockAjax({
        url:'/floor',
        method:'get'
    })
}

//search页面   请求体参数  一个对象
export const reqSearchInfo=(searchParams)=>{
    return request({
        url:'list',
        method:'post',
        data:searchParams   //用户搜索的参数  必须是一个对象 可以使空的  但是必须传
    })
}

//请求获取详情数据
export const reqDetailInfo=(skuId)=>{
    return request({
        url:`/item/${skuId}`,
        method:'get'
    })
}

//请求添加购物车  可以修改购物车的数量
export const  reqAddOrUpdateShopCart=(skuId,skuNum)=>{
    return request({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
}

//请求获取购物车页面数据
export const reqShopCartInfo=()=>{
    return request({
        url:'/cart/cartList',
        method:'get'
    })
}

//修改购物车选中状态
export const reqUpdateCartIsChecked=(skuId,isChecked)=>{
    return request({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}
export const reqDeleteShopCart=(skuId)=>{
    return request ({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}


//请求注册用户
export const reqUserRegister=(userInfo)=>{
    return request ({
        url:'/user/passport/register',
        method:'post',
        data:userInfo
    })
}

//请求获取验证码
export const reqGetCode=(phone)=>{
    return request({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

//请求用户登录
export const reqUserLogin=(userInfo)=>{
    return request({
        url:'/user/passport/login',
        method:'post',
        data:userInfo
    })
}

//根据token请求获取用户信息  参数token已经在请求头中添加了
export const reqgetUserInfo=()=>{
    return request({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}

//请求退出登录
export const reqUserLogout=()=>{
    return request({
        url:'/user/passport/logout',
        method:'get'
    })
}

//请求获取用户收货地址信息
export const reqUserAddressList=()=>{
    return request({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}

//获取交易信息
export const reqTradeInfo=()=>{
    return request({
        url:'/order/auth/trade',
        method:'get'
    })
}

//请求提交创建订单
export const reqSubmitOrder= (tradeNo,tradeInfo)=>{
    return request({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data:tradeInfo
    })
    
}
//请求获取支付信息
export const reqPayInfo=(orderId)=>{
    return request({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}

//请求获取订单支付状态
export const reqPayStatus=(orderId)=>{
    return request({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

//请求获取我的订单列表数据
export const reqMyOrderInfo=(page,limit)=>{
    return request({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}