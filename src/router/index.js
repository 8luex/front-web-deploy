// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import(/* webpackChunkName: "home" */ '@/views/activity/index.vue'),
      },
      {
        path: 'connect',
        name: 'connect',
        component: () => import(/* webpackChunkName: "home" */ '@/views/connect/index.vue'),
      },
      {
        path: 'connect-done',
        name: 'connect-done',
        component: () => import(/* webpackChunkName: "home" */ '@/views/connect/done.vue'),
      },
      {
        path: 'disconnect',
        name: 'disconnect',
        component: () => import(/* webpackChunkName: "home" */ '@/views/disconnect/index.vue'),
      },
      {
        path: 'activitysavailable',
        name: 'activitysavailable',
        component: () => import(/* webpackChunkName: "home" */ '@/views/activitysavailable/index.vue'),
      },
      {
        path: 'test',
        name: 'test',
        component: () => import(/* webpackChunkName: "home" */ '@/views/connect/test.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router