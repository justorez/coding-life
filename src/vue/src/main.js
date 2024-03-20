import { createApp } from 'vue'
import {
    createRouter,
    createWebHistory,
    createWebHashHistory
} from 'vue-router/auto'
import store from './store'
import App from './App.vue'
import utils from './utils'
import './assets/main.css'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    extendRoutes: (routes) => {
        routes.unshift({ path: '/', redirect: '/maxlength' })
        return routes
    }
})

const app = createApp(App)
app.use(router)
app.use(store)
app.use(utils)
app.mount('#app')
