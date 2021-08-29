<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart,index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @click="updateOneCheck(cart)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuNmae}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeCartNum(cart,-1,true)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"
             @change="changeCartNum(cart,$event.target.value*1,false)">
            <a href="javascript:void(0)" class="plus" @click="changeCartNum(cart,1,true)">+</a>
          </li>
          <li class="cart-list-con6">
          <span class="sum">{{cart.skuPrice*cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteOne(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckedAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkedNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allMoney}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a>
            -->
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'ShopCart',
    mounted(){
      this.getShopCartInfo()
    },
    methods:{
      getShopCartInfo(){
        this.$store.dispatch('getShopCartInfo')
      },
     async changeCartNum(cart,disNum,flag){
        //disNum  如果点击的是加减 传递过来的是-1和1 是变化的量   如果是输入框change传过来的 这个是最终的量 需要 
        //flag 用于判断用户是点加减进来的  还是输入框失去焦点进来的
        let originNum=cart.skuNum  // 原来的数量
        if(flag){
          if(originNum+disNum<1){  //原本的数量变化之后比1还小 修正disNum
            disNum=1-originNum  //修正他俩之和是1
          }
        }else{
            //这里传递的是input输入的值
            if(disNum<1){//disNum 代表是最终的值
             disNum=1-originNum  //这里的disNum代表的是变化的量
            }else{
              disNum=disNum-originNum  //  disNum   左边是变化的   右边是最终的
            }
        }
        //最终disNum就是变化的量
        //发请求修改数量 请求成功 获取数量
        try {
        await this.$store.dispatch('addAddOrUpdateShopCart',{skuId:cart.skuId,skuNum:disNum})  //发请求修改购物车数据
          this.getShopCartInfo()  //重新发请求获取购物车数据
        } catch (error) {
          alert(error.message)
        }
        },

        //修改购物车选中状态
     async updateOneCheck(cart){
         try {
         await this.$store.dispatch('updateCartIsChecked',{skuId:cart.skuId,isChecked:cart.isChecked?0:1})
          this.getShopCartInfo()
         } catch (error) {
            alert(error.message)
         }
        },
        //删除单个购物车数据
       async deleteOne(cart){
             try {
         await this.$store.dispatch('deleteShopCart',cart.skuId)
          this.getShopCartInfo()
         } catch (error) {
            alert(error.message)
         }
        },
        //删除多个
        async deleteAll(){
            try {
         await this.$store.dispatch('deleteShopCartAll')
          this.getShopCartInfo()
         } catch (error) {
            alert(error.message)
         }
        }
    },
    computed:{
      ...mapGetters(['cartInfo']),
      cartInfoList(){
        return this.cartInfo.cartInfoList || []
      },
      checkedNum(){  //统计选择的件数
        return this.cartInfoList.reduce((prev,item)=>{
          if(item.isChecked){
            prev+=item.skuNum
          }
          return prev
        },0)
      },
      allMoney(){
        return this.cartInfoList.reduce((prev,item)=>{
          if(item.isChecked){
            prev+=item.skuNum*item.skuPrice
          }
          return prev
        },0)
      },
      //计算全选数据
      isCheckedAll:{
        get(){  //读
          return this.cartInfoList.every(item=>item.isChecked)
        },
       async set(val){ //写    val拿到的是多选框的checked属性值 是一个布尔值
       try {
         await this.$store.dispatch('updateCartIscheckedAll',val?1:0)
          this.getShopCartInfo()
       } catch (error) {
            alert(error.message)
         
       }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width:15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>