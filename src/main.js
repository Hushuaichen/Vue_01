import Vue from 'vue'
import App from './App.vue'
// import App from '@/App.vue'     @表示的是src的路径
import router from '@/router'
// import '@/api'
import store from '@/store'
import '@/mock/mockServer'
import 'swiper/css/swiper.css'



//全局注册组件  一个组件被多个组件使用时
import TypeNav from '@/components/TypeNav'
Vue.component('TypeNav',TypeNav)
import SlideLoop from '@/components/SlideLoop'
Vue.component('SlideLoop',SlideLoop)
import Pagination from '@/components/Pagination'
Vue.component('Pagination',Pagination)

import * as API from '@/api'  //直接获取接口请求函数文件暴露出来的对象

//element-ui分为两种组件 第一种
import { Button,MessageBox,Message} from 'element-ui';
Vue.use(Button)
//第二种 引入之后不能直接注册 要挂在vue的原型上
// Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;  //用来做提示消息

Vue.config.productionTip = false

new Vue({
  beforeCreate(){
    Vue.prototype.$bus=this   //安装全局事件总线   任意组件内部都可以访问到(this.$bus)、
    Vue.prototype.$API=API
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app')
