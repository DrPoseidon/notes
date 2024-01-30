import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import VueClickAway from 'vue3-click-away'

const pinia = createPinia()
createApp(App).use(router).use(pinia).use(VueClickAway).mount('#app')
