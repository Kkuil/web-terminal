import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'web-terminal',
      component: () => import('@/components/WebTerminal.vue')
    }
  ]
})

export default router
