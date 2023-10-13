import Vue from 'vue'
import Vuex from 'vuex'
// 解决vuex 刷新丢失数据问题
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 动态路由添加
/* function addNewRoute(menuList){
    let routes = router.options.routes
    routes.forEach(routeItem => {
        // /index是除登录外其余所有路由的父路由
        if(routeItem.path=='/index'){
            menuList.forEach(menu=>{
                let childRoute={
                    path:'/'+menu.menuclick,
                    name:menu.menuname,
                    meta:{
                        title:menu.menunane
                    },
                    component:()=>import('@/components/'+ menu.menucomponent)
                }
                routeItem.children.push(childRoute)
            })
        }
    });
    router.addRoutes(routes)
}
 */
export default new Vuex.Store({
    state: {
        rdata: {},
    },
    mutations: {

        setData(state, rowData) {
            state.rdata = rowData
        },

    },
    getters: {
        getData(state) {
            return state.rdata
        }

    },
    // plugins: [
    //     createPersistedState({
    //         key:'menu',
    //         paths:['menu']
    //     })
    // ]
})


/* 
    登录后，从服务端获取菜单数据，调用方法，把数据存在vuex里
    service('post','/login',this.form).then(res=>{
        if(res.data.status === 200){
            setToken('token',res.data.token)
            this.$store.commit("setMenu",res.data.menus)
        }
    })

    在menu组件，
    <el-menu-item :index="'/'+item.menuclick" v-for="(item,index) in menus" :key="index" >
        <i :class="item.iconClass"></i>
        <span slot="title">{{ item.name }}</span>
    </el-menu-item>
    computed:{
        return ...mapGetters({menus:'getMenu'})
    }
*/