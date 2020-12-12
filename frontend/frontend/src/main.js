/*
 * @Author: your name
 * @Date: 2020-11-30 19:45:11
 * @LastEditTime: 2020-12-11 14:57:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \frontend\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import api from './axios/api'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/index.css'

import store from "./store";
import "./helper";

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

//api
// Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
