import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Note from '@/views/note'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/notes',
    name: 'note',
    component: Note
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/notes'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
