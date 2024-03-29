// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "activity",
        name: "activity",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/activity/index.vue"),
      },
      {
        path: "connect",
        name: "connect",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/connect/index.vue"),
      },
      {
        path: "connect-teacher",
        name: "connect-teacher",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/teacher/connect/index.vue"
          ),
      },
      {
        path: "connect-done",
        name: "connect-done",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/connect/done.vue"),
      },
      {
        path: "connect-done-teacher",
        name: "connect-done-teacher",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/teacher/connect/done.vue"
          ),
      },
      {
        path: "disconnect",
        name: "disconnect",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/disconnect/index.vue"),
      },
      {
        path: "disconnect-teacher",
        name: "disconnect-teacher",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/teacher/disconnect/index.vue"
          ),
      },
      {
        path: "activitysavailable",
        name: "activitysavailable",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/activitysavailable/index.vue"
          ),
      },
      {
        path: "activitysavailable-done",
        name: "activitysavailable-done",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/activitysavailable/done.vue"
          ),
      },
      {
        path: "myactivityenroll",
        name: "myactivityenroll",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/myactivityenroll/index.vue"
          ),
      },
      {
        path: "create",
        name: "create",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/teacher/create/index.vue"
          ),
      },
      {
        path: "create-done",
        name: "create-done",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/teacher/create/done.vue"
          ),
      },
      {
        path: "created",
        name: "created",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/teacher/created/index.vue"
          ),
      },
      {
        path: "edit",
        name: "edit",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/teacher/edit/index.vue"
          ),
      },
      {
        path: "adminactivity",
        name: "adminactivity",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/admin/adminactivity.vue"
          ),
      },
      {
        path: "adminstudent",
        name: "adminstudent",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/admin/adminstudent.vue"
          ),
      },
      {
        path: "adminteacher",
        name: "adminteacher",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/admin/adminteacher.vue"
          ),
      },
      {
        path: "theactivity",
        name: "theactivity",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/admin/theactivity.vue"
          ),
      },
      {
        path: "account",
        name: "account",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/account/index.vue"),
      },
      {
        path: "calendar",
        name: "calendar",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/calendar/index.vue"),
      },
      {
        path: "test",
        name: "test",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/teacher/created/test.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
