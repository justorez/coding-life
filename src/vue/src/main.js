import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
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
app.config.globalProperties.utils = utils
app.use(router)
app.mount('#app')
