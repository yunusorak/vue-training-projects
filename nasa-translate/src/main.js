import Vue from 'vue'
import App from './App.vue'
import Vuex from "vuex"
import { router } from "./routes"
import { store } from "./store/store"

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')