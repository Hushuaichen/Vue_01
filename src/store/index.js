import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from './home'
import user from './user'
import search from './search'

const state={

}


const mutations={

}
const actions={

}

const getters={
    //简化数据的操作
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,

    modules:{   //模块化
        home,
        user,
        search
    }
})