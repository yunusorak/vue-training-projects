import Vue from "vue";
import VueRouter from "vue-router"
import MainComponent from "./components/MainComponent.vue"
import TranslateComponent from "./components/TranslateComponent.vue"

import { store } from "./store/store"

Vue.use(VueRouter)

const routes = [
    { path: "/", component: MainComponent },
    {
        path: "/ceviri",
        component: TranslateComponent,
        beforeEnter(to, from, next) {
            if (store.getters.getToken) {
                next()
            } else {
                next("/login")
            }
        }
    },
    {
        path: "/login",
        component: () =>
            import ('./components/LoginComponent.vue')

    }, { path: "*", redirect: "/" }
]

export const router = new VueRouter({
    routes,
    mode: "history"
})