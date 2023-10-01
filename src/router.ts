import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home'
import Note from '@/views/note'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/note/:id',
        name: 'note',
        component: Note
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: { name: 'home' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
