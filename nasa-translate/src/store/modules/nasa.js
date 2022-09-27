import axios from "axios";
import { router } from "../../routes"
const state = {
    // counter: 0,
    baseStuff: {},
    originalText: null
}

const getters = {
    // getDoubleCounter(state) {
    //     return state.counter * 10
    // },
    // stringCounter(state) {
    //     return `${state.counter}.kez tıklandı`
    // },
    getBaseStuff(state) {
        return state.baseStuff
    },

}

const mutations = {
    // increaseCounter(state) {
    //     state.counter++
    // },
    // ,
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
    getNasaDayApi({ commit }) {
        axios
            .get(
                "https://api.nasa.gov/planetary/apod?api_key=v6qFy2GzLxg3yozIeK0yDjNSAqH5ic4NTaeC3Ehz"
            )
            .then((response) => {
                // let data = response.data;
                // this.baseStuff = {
                //     title: data.title,
                //     description: data.explanation,
                //     image: data.url, // data.hdurl,
                //     date: data.date,
                // };
                commit("updateDayData", response.data)
            });
    },
    addTranslateToDatabase({ getters }, data) {
        // if (state.baseStuff.date) {
        //     //
        // }
        data.originalData = getters.getBaseStuff
        axios.post("https://nasa-ceviri-default-rtdb.firebaseio.com/translations.json", data)
            // .then(() => {
            // state.baseStuff.turkishTranslate = data.text
            // })
        router.replace("/")
    },
    getTranslateDatabase({ commit }) {
        axios.get("https://nasa-ceviri-default-rtdb.firebaseio.com/translations.json")
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