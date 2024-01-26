import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import VueClickAway from 'vue3-click-away'
import 'virtual:svg-icons-register'

const pinia = createPinia()
createApp(App).use(router).use(pinia).use(VueClickAway).mount('#app')
