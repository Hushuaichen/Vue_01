import axios from 'axios'//创建一个新的axios实例进行封装
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

const service = axios.create({//创建一个新的和axios有同样功能的实例，
    baseURL:'/api',
    timeout:20000
});


//请求拦截器
service.interceptors.request.use(
    function(config){
    NProgress.start();  //停止进度条
    return config;
})



//响应拦截器
service.interceptors.response.use(
    function(response){
        NProgress.done();
    return response.data;
},
    function(error){
         NProgress.done();   //停止进度条
    alert('发送ajax的请求失败'+error.message||'未知报告')
    return new Promise(()=>{})
})

export default service



