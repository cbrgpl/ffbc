import { createRouter, createWebHistory } from "vue-router";
import { isAuthRequiredMeta, authGuard, newRedirectGuard } from "./utilities/auth-guard";
import { ROUTE_404_NAME } from "./static";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "Root",
      path: "/",
      component: () => import("@/layouts/q-empty-layout"),
      beforeEnter: newRedirectGuard({
        authRedirect: "Home",
        unauthRedirect: "Auth",
      }),
    },
    {
      path: "/auth",
      component: () => import("@/layouts/q-empty-layout"),
      redirect: { name: "Auth" },
      beforeEnter: authGuard,
      meta: {
        ...isAuthRequiredMeta(false),
      },
      children: [
        {
          name: "Auth",
          component: () => import("@/pages/auth/index.ts"),
          path: "",
          meta: {
            ...isAuthRequiredMeta(false),
          },
        },
      ],
    },
    {
      component: () => import("@/layouts/q-main-layout"),
      path: "/",
      meta: {
        ...isAuthRequiredMeta(true),
      },
      beforeEnter: authGuard,
      children: [
        {
          name: "Home",
          path: "home",
          component: () => import("@/pages/home"),
        },
        {
          name: "Services",
          path: "services",
          component: () => import("@/pages/services/index.ts"),
        },
        {
          name: "InputCharsList",
          path: "input-chars",
          component: () => import("@/pages/input-chars-list/index.ts"),
        },
      ],
    },
    {
      path: "/error-happen",
      component: () => import("@/layouts/q-empty-layout"),
      name: "ErrorHappen",
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/layouts/q-empty-layout"),
      children: [
        {
          name: ROUTE_404_NAME,
          path: "",
          component: () => import("@/pages/not-found"),
        },
      ],
    },
  ],
});

export default router;
