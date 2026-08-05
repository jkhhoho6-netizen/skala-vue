import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/weather',
    },
    {
      path: '/weather',
      name: 'weather-home',
      component: () => import('../views/WeatherHomeView.vue'),
    },
    {
      path: '/weather/:cityId',
      name: 'weather-detail',
      component: () => import('../views/WeatherDetailView.vue'),
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/WeatherAboutView.vue'),
    },
    {
      path: '/air-quality',
      name: 'air-quality',
      component: () => import('../views/AirQualityView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
