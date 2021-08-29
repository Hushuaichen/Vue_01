<template>
  <div>
    <!-- <el-button type="primary"></el-button> -->
    <Header></Header>
    <router-view></router-view>   
    <Footer v-show="!$route.meta.isHidden"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
    name:"App",
    components:{Header,Footer},
    mounted(){
        this.$store.dispatch('getCategoryList')
    }
}
</script>

<style>

</style>