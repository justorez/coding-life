import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'


const app = createApp(App)

import utils from './utils'
app.config.globalProperties.utils = utils

app.use(router)
app.mount('#app')
