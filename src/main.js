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




Vue.config.productionTip = false

new Vue({
  beforeCreate(){
    Vue.prototype.$bus=this   //安装全局事件总线   任意组件内部都可以访问到(this.$bus)
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app')
