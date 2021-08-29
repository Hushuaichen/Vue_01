import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import Myorder from '@/pages/Center/Myorder'
import Grouporder from '@/pages/Center/Grouporder'
export default [
    {
        path:'/home',
        component:Home
    },
    {
        path:'/search/:keyword?',
        component:Search,
        name:'search',
       
    },
    {
        path:'/login',
        component:Login,
        meta:{
            isHidden:true
        }
    },
    {
        path:'/register',
        component:Register,
        meta:{
            isHidden:true
            }
    },
    {
        path:'/',
        redirect:'/home'   //重定向
    },
    {
        path:'/detail/:goodsId',
        component:Detail
    },
    {
        path:'/addCartSuccess',
        component:AddCartSuccess
    },
    {
        path:'/shopcart',
        component:ShopCart
    }, 
    {
        path:'/trade',
        component:Trade
    },
    {
        path:'/pay',
        component:Pay
    },
    {
        path:'/paysuccess',
        component:PaySuccess
    },
    {
        path:'/center',
        component:Center,
        children:[
            {
                path:'myorder',
                component:Myorder
            },
            {
                path:'grouporder',
                component:Grouporder

            },
            {
                path:'',
                redirect:'myorder'
            }

        ]
    }
   
]