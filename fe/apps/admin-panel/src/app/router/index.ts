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
      name: "Auth",
      component: () => import("@/pages/auth/index.ts"),
      path: "/auth",
    },
  ],
});

export default router;
