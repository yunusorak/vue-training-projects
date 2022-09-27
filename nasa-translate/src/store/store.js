import Vue from "vue"
import Vuex from "Vuex"
import nasa from "./modules/nasa"
import * as mutations from "./mutations"
import * as getters from "./getters"
import * as actions from "./actions"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        fbToken: ""
    },
    getters,
    mutations,
    actions,
    modules: {
        nasa: nasa
    }
})