import { reactive } from 'vue'

/**
 * 简易版 Vuex
 */
class Store {
    constructor(options = {}) {
        const stateData = options.state || {}
        const state = typeof stateData === 'function' ? stateData() : stateData
        this.state = reactive(state)

        const getters = options.getters || {}
        this.getters = {}
        Object.keys(getters).forEach((getterName) => {
            Object.defineProperty(this.getters, getterName, {
                get: () => {
                    return getters[getterName](this.state)
                }
            })
        })

        const mutations = options.mutations || {}
        this.mutations = {}
        Object.keys(mutations).forEach((mutationName) => {
            this.mutations[mutationName] = (payload) => {
                mutations[mutationName](this.state, payload)
            }
        })

        const actions = options.actions || {}
        this.actions = {}
        Object.keys(actions).forEach((actionName) => {
            this.actions[actionName] = async (payload) => {
                return actions[actionName](this, payload)
            }
        })

        // this 绑定
        const store = this
        const { commit, dispatch } = this
        this.commit = function boundCommitt(type, payload) {
            return commit.call(store, type, payload)
        }
        this.dispatch = function boundDispatch(type, payload) {
            return dispatch.call(store, type, payload)
        }
    }

    commit(type, payload) {
        this.mutations[type](payload)
    }

    async dispatch(type, payload) {
        return this.actions[type](payload)
    }

    install(app) {
        app.config.globalProperties.$store = this
    }
}

export function createStore(options) {
    return new Store(options)
}
