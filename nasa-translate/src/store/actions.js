import { router } from "@/routes"
import axios from "axios"

export const initAuth = ({ dispatch, commit }) => {
    let token = localStorage.getItem("token")
    if (token) {
        let expirationDate = localStorage.getItem("expirationDate")
        let time = new Date().getTime()

        if (time >= +expirationDate) {
            console.log("Token süresi dolmuş")
            dispatch(logout)
        } else {
            commit("setToken", token)
            let timerSecond = +expirationDate - time
            console.log(timerSecond)
            dispatch("setTimeoutTimer", timerSecond)
            router.push("/ceviri")
        }

    }
}

export const login = ({ commit }, payload) => {
    axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBusidlxLclKPQ5goJD23yJUUsgijinO_g",
            // email: "deneme1@gmail.com",
            // password: 123456,
            // returnSecureToken: true,
            payload)
        .then(response => {
            commit("setToken", response.data.idToken)
            localStorage.setItem("token", response.data.idToken)
            localStorage.setItem("expirationDate", new Date().getTime() + +response.data.expiresIn * 1000)
            router.push("/ceviri")
        })
}

export const logout = ({ commit }) => {
    commit("clearToken")
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    router.replace("/")
}

export const setExpiresTimer = ({ dispatch }, expiresIn) => {
    setTimeout(() => {
        dispatch(logout)
    }, expiresIn)
}