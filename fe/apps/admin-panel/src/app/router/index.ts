import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "Root",
      path: "/",
      redirect: "/auth",
    },
    {
      path: "/auth",
      component: () => import("@/layouts/q-empty-layout"),
      redirect: { name: "Auth" },
      children: [
        {
          name: "Auth",
          component: () => import("@/pages/auth/index.ts"),
          path: "/auth",
        },
      ],
    },
    {
      component: () => import("@/layouts/q-empty-layout"),
      path: "/home",
      redirect: { name: "Home" },
      children: [
        {
          name: "Home",
          path: "",
          component: () => import("@/pages/home"),
        },
      ],
    },
  ],
});

export default router;
