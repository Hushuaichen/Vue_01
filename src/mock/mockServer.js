import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'
//模拟数据接口
Mock.mock('/mock/banner',{code:200,data:banner})  //第一个参数表示请求的路径  第二个参数表示请求的数据
Mock.mock('/mock/floor',{code:200,data:floor})
