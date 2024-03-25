import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import store from './store'
import App from './App.vue'
import './assets/main.css'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    extendRoutes: (routes) => {
        routes.unshift({ path: '/', redirect: '/maxlength' })
        return routes
    }
})

createApp(App).use(router).use(store).mount('#app')
