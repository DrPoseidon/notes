import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Note from '@/views/note'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/note',
    name: 'note',
    component: Note
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'note' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
