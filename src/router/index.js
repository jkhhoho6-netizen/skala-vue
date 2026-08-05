import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // GitHub Pages의 프로젝트 경로에서도 `/#/weather` 형식으로 동작하도록
  // hash 내부에는 Vite base 경로를 다시 넣지 않는다.
  history: createWebHashHistory(),
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
