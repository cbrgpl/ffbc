import type { NavigationMenuItem } from "@nuxt/ui";

export enum MainLayoutRouteNames {
  HOME = "Home",
  SERVICES = "Services",
  CATEGORIES = "ErrorHappen",
  TEMPLATES = "ErrorHappen",
}

export const mainLayoutNavigation: Array<NavigationMenuItem> = [
  {
    label: "Home",
    to: { name: MainLayoutRouteNames.HOME },
    icon: "mdi-home-account",
  },
  { label: "Services", to: { name: MainLayoutRouteNames.SERVICES }, icon: "mdi-room-service" },
  { label: "Categories", disabled: true, to: { name: MainLayoutRouteNames.CATEGORIES }, icon: "mdi-filter-cog" },
  { label: "Templates", disabled: true, to: { name: MainLayoutRouteNames.TEMPLATES }, icon: "mdi-form-select" },
];
