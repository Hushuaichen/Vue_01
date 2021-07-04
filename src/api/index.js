//接口请求函数

import axios from 'axios'
import request from './ajax'

export const reqCategoryList=()=>{
    return request({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}
// reqCategoryList() 