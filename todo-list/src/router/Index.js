import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [{
            path: "/",
            component: () =>
                import ("../views/Todos.vue")
        },
        {
            path: "/addTodo",
            component: () =>
                import ("../views/AddTodo.vue")
        },
        {
            path: "*",
            redirect: "/"
        },
    ],
    mode: "history"
})