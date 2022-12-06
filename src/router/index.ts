import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:"index"
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../components/Product.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/Index.vue')
    },
  ]
})

export default router
