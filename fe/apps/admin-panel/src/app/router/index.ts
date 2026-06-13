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
      path: "/home",
      component: () => import("@/layouts/q-empty-layout"),
      redirect: { name: "Auth" },
      children: [
        {
          path: "",
          component: () => import("@/layouts/q-empty-layout"),
        },
      ],
    },
  ],
});

export default router;
