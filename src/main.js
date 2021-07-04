import Vue from 'vue'
import App from './App.vue'
// import App from '@/App.vue'     @表示的是src的路径
import router from '@/router'
// import '@/api'
import store from '@/store'


//全局注册组件  一个组件被多个组件使用时
import TypeNav from '@/components/TypeNav'
Vue.component('TypeNav',TypeNav)





Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')