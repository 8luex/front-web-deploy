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
        path: 'connect-teacher',
        name: 'connect-teacher',
        component: () => import(/* webpackChunkName: "home" */ '@/views/teacher/connect/index.vue'),
      },
      {
        path: 'connect-done',
        name: 'connect-done',
        component: () => import(/* webpackChunkName: "home" */ '@/views/connect/done.vue'),
      },
      {
        path: 'connect-done-teacher',
        name: 'connect-done-teacher',
        component: () => import(/* webpackChunkName: "home" */ '@/views/teacher/connect/done.vue'),
      },
      {
        path: 'disconnect',
        name: 'disconnect',
        component: () => import(/* webpackChunkName: "home" */ '@/views/disconnect/index.vue'),
      },
      {
        path: 'disconnect-teacher',
        name: 'disconnect-teacher',
        component: () => import(/* webpackChunkName: "home" */ '@/views/teacher/disconnect/index.vue'),
      },
      {
        path: 'activitysavailable',
        name: 'activitysavailable',
        component: () => import(/* webpackChunkName: "home" */ '@/views/activitysavailable/index.vue'),
      },
      {
        path: 'activitysavailable-done',
        name: 'activitysavailable-done',
        component: () => import(/* webpackChunkName: "home" */ '@/views/activitysavailable/done.vue'),
      },
      {
        path: 'myactivityenroll',
        name: 'myactivityenroll',
        component: () => import(/* webpackChunkName: "home" */ '@/views/myactivityenroll/index.vue'),
      },
      {
        path: 'create',
        name: 'create',
        component: () => import(/* webpackChunkName: "home" */ '@/views/teacher/create/index.vue'),
      },
      {
        path: 'test',
        name: 'test',
        component: () => import(/* webpackChunkName: "home" */ '@/views/teacher/create/test.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router