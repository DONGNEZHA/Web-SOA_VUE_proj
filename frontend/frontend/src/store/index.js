/*
 * @Author: your name
 * @Date: 2020-11-30 19:45:11
 * @LastEditTime: 2020-12-11 14:04:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \frontend\src\store\index.js
 */
import Vue from "vue";
import Vuex from "vuex";
import state from "./state"
import * as getters from "./getters"
import * as mutations from "./mutations"
import * as actions from "./actions"
import createLogger from "vuex/dist/logger"

const debug = process.env.NODE_ENV !== "production"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        role: -1,
    },
    getters,
    actions,
    mutations,
    mutations:{
        logIn(state,role){
            state.isLoggedIn=true;
            state.role=role;
        },
        logOut(state){
            state.isLoggedIn=false;
            state.role=-1;
        }
    }
});
