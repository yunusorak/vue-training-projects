import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { router } from "../router/Index"

Vue.use(Vuex)

axios.defaults.baseURL = 'https://todolist-56e64-default-rtdb.firebaseio.com';
export const store = new Vuex.Store({
    state: {
        todos: [],
        completedTodos: [],
    },
    getters: {
        getTodos(state) { return state.todos },
        getCompletedTodos(state) { return state.completedTodos }
    },
    mutations: {
        setTodos(state, data) {
            for (let todo in data) {
                let todoData = data[todo]
                todoData.key = todo
                state.todos.push(todoData)
            }
        },
        setCompletedTodos(state, data) {
            for (let todo in data) {
                let todoData = data[todo]
                todoData.key = todo
                state.completedTodos.push(todoData)
            }
        },
        addTodos(state, todo) {
            state.todos.push(todo)
        },
        clearTodos() { //
        },
    },
    actions: {
        initAuth({ commit }) {
            axios.get("/todos.json").then(response => {
                commit("setTodos", response.data)

            })
            axios.get("/completed.json").then(response => {
                commit("setCompletedTodos", response.data)
            })
        },
        addTodo({ commit }, payLoad) {
            axios.post("/todos.json", payLoad).then(response => {
                commit("addTodos", {...payLoad, key: response.data.name })
            })
        },
        deleteTodo({ state }, payLoad) {



            for (let todo in payLoad) {
                for (let todoS in state.todos) {
                    if (state.todos[todoS].key == payLoad[todo]) {
                        axios.post("/completed.json", state.todos[todoS])
                        axios.delete(`/todos/${payLoad[todo]}.json`)
                    }
                }
            }
            router.go("/")
        },
        // get() { //
        // }
    },
})