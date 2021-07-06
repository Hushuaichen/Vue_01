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