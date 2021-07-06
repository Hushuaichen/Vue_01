<template>
   <!--banner轮播-->
                    <div class="swiper-container" ref="bannerSwiper">
                        <div class="swiper-wrapper" >
                            <div class="swiper-slide" v-for="(banner,index) in bannerList" :key="banner.id">
                                <img :src="banner.imgUrl" />
                            </div>
                        </div>
                        <!-- 如果需要分页器 -->
                        <div class="swiper-pagination"></div>

                        <!-- 如果需要导航按钮 -->
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name:'',
    props:['bannerList'],
     watch:{
        bannerList:{
            immediate:true,//没用  就是为了和floor中的代码保持一致
            handler(newVal,oldVal){
            this.$nextTick(()=>{//页面的最近的一次更新完成之后才会执行  updated 只要页面有数据更新 就会执行 
            new Swiper (this.$refs.bannerSwiper, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            
            // 如果需要分页器
            pagination: {
            el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
    },
    })  
                })
          
            }
        }
    }
}
</script>

<style>
    
</style>