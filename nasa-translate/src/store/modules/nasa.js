import axios from "axios";
import { router } from "../../routes"
const state = {
    baseStuff: {},
    originalText: null,
    apiKey: "",
    fbURL: "",
}

const getters = {
    getBaseStuff(state) {
        return state.baseStuff
    },

}

const mutations = {
    updateDayData(state, data) {
        if (data.text) {
            state.baseStuff.turkishLanguage = data.text
            state.originalText = data.explanation

        } else {
            state.originalText = data.explanation
            state.baseStuff = data
        }
    },
    addTurkishLanguge(state, data) {
        state.baseStuff.originalDesc = state.baseStuff.explanation
        state.baseStuff.explanation = data
    },
    getOriginalText(state) {
        state.baseStuff.explanation = state.originalText
    }
}

const actions = {
    // increment({ commit }) { // commit vasıtasıyla mutations nın içerisindek ifonksiyonlara erişebilirmi
    //     commit("increaseCounter")
    // },
    getNasaDayApi({ commit, state }) {
        axios
            .get(
                `https://api.nasa.gov/planetary/apod?api_key=${state.apiKey}`
            )
            .then((response) => {
                commit("updateDayData", response.data)
            });
    },
    addTranslateToDatabase({ getters }, data) {
        data.originalData = getters.getBaseStuff
        axios.post(`{state.fbURL}/translations.json`, data)
        router.replace("/")
    },
    getTranslateDatabase({ commit }) {
        axios.get(`{state.fbURL}/translations.json`)
            .then((response) => {
                let data = response.data
                for (let key in data) {
                    let date1 = data[key].originalData.date
                    let date2 = new Date()
                    if (date1 > date2) {
                        //
                    } else if (date2 > date1) {
                        //
                    } else {
                        commit("addTurkishLanguge", data[key].text)
                    }
                }
            })
    }

}


export default {
    state: state,
    getters,
    mutations: mutations,
    actions
}
