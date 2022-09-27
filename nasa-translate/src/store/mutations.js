export const setToken = (state, token) => {
    state.fbToken = token
}

export const clearToken = (state) => {
    state.fbToken = ""
}