//用户相关的工具函数
//专门用来生成用户的临时标识 标识唯一 一旦生成不会轻易改变

import {v4 as uuidv4} from 'uuid'
export function getUserTempId(){
    //先从locolstorage获取用户的临时标识 
    let userTempId = localStorage.getItem('USERTEMPID_KEY')
    //如果获取到了 返回使用  获取不到 返回的是null
    if(!userTempId){
    //如果没有获取到 再通过uuid获取创建 并存储到localstorage 
        userTempId=uuidv4()
        localStorage.setItem('USERTEMPID_KEY',userTempId)
    }
    return userTempId
}  