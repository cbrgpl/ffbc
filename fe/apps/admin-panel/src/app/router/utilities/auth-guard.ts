import { useSessionStore } from "@/entities/session";
import { unref } from "vue";
import type { NavigationGuard, RouteRecord } from "vue-router";
import { ROUTE_404_NAME } from "../static";

type RouteAuthMeta = {
  _routeAuthMeta: true;
  auth: boolean;
};

const isRouteAuthMeta = (value: unknown): value is RouteAuthMeta =>
  typeof value === "object" &&
  value !== null &&
  "_routeAuthMeta" in value &&
  typeof value._routeAuthMeta === "boolean" &&
  value._routeAuthMeta;

export const isAuthRequiredMeta = (required: boolean): RouteAuthMeta => ({ _routeAuthMeta: true, auth: required });

const resolveAccess = async (to: { matched: RouteRecord[] }): Promise<{ allowed: boolean; authed: boolean | null } | null> => {
  // null means doesn't matter
  let authRequired: boolean | null = false;

  for (const route of to.matched) {
    if (isRouteAuthMeta(route.meta)) {
      authRequired = route.meta.auth;

      // the first route with required auth break the cycle
      if (route.meta.auth) {
        break;
      }
    }
  }

  const sessionStore = useSessionStore();
  await sessionStore.waitSessionLoad();

  const sessionLoaded = unref(sessionStore.sessionLoad);

  if ((authRequired === true && sessionLoaded === true) || (authRequired === false && sessionLoaded === false) || authRequired === null) {
    return { allowed: true, authed: sessionLoaded };
  } else if (!authRequired && sessionLoaded) {
    return { allowed: false, authed: sessionLoaded };
  } else if (authRequired && sessionLoaded === false) {
    return { allowed: false, authed: sessionLoaded };
  }

  return null;
};

const resolveDeniedAccess = (authed: boolean | null) => ({ name: authed ? "Home" : "Auth" });

export const authGuard: NavigationGuard = async (to) => {
  const resolvedAccess = await resolveAccess(to);

  if (resolvedAccess === null) {
    return { name: ROUTE_404_NAME };
  } else if (resolvedAccess.allowed) {
    return true;
  }

  return resolveDeniedAccess(resolvedAccess.authed);
};

/** Allows to configure redirection for both auth and unauth states for route */
type AccessRedirect = {
  authRedirect: string;
  unauthRedirect: string;
};

export const newRedirectGuard =
  (redirect: AccessRedirect): NavigationGuard =>
  async (to) => {
    const resolvedAccess = await resolveAccess(to);

    if (resolvedAccess === null) {
      return { name: ROUTE_404_NAME };
    } else if (resolvedAccess.allowed) {
      return {
        name: resolvedAccess.authed ? redirect.authRedirect : redirect.unauthRedirect,
      };
    }

    return resolveDeniedAccess(resolvedAccess.authed);
  };
