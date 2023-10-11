import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Note from '@/views/note'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'note',
    component: Note
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'note' }
  }
]

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === 'production' ? '/notes/' : '/'
  ),
  routes
})

export default router
