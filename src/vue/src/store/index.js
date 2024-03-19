import { createStore } from './mvuex'

export default createStore({
    state: {
        num: 1
    },
    getters: {
        getNum: (state) => {
            return state.num
        }
    },
    mutations: {
        add(state, val = 1) {
            state.num += val
        }
    },
    actions: {
        asyncAdd({ commit }, val) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('add', val)
                    resolve()
                }, 1000)
            })
        }
    }
})
