import Vue from 'vue'
import App from './App.vue'
// import './plugins/element.js'
import 'font-awesome/css/font-awesome.min.css'
// import axios from 'axios'
import router from './router'
import service from './service'

import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

import echarts from 'echarts'
import NProgress from 'nprogress'

Vue.use(ElementUI)
// 挂载到原型，可以在全局使用
// Vue.prototype.axios = axios
Vue.prototype.service = service
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

//路由导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (!localStorage.getItem('token')) {
    if (!to.path === '/login') {
      next('/login')
      NProgress.done()
    } else next()
  } else next()
})

new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app')
