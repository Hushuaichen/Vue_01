import axios from 'axios'//创建一个新的axios实例进行封装
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import store from '@/store'

const service = axios.create({//创建一个新的和axios有同样功能的实例，
    baseURL:'/api',
    timeout:20000
});


//请求拦截器
service.interceptors.request.use(
    function(config){
    NProgress.start();  //开启进度条

    //请求头中需要添加临时标识 后期每个请求都会带上这个临时标识
    let userTempId= store.state.user.userTempId
    if(userTempId){
        config.headers.userTempId=userTempId
    }
    //登陆成功后 需要把token添加到请求头当中 今后所有的请求头当中都要带上这个token
    let token =store.state.user.token
    if(token){
        config.headers.token=token
    }
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



