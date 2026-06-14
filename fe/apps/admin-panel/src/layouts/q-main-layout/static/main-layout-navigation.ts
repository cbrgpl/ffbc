import type { NavigationMenuItem } from "@nuxt/ui";

export const mainLayoutNavigation: Array<NavigationMenuItem> = [
  {
    label: "Home",
    to: "home",
    icon: "mdi-home-account",
  },
  { label: "Services", to: "services", icon: "mdi-room-service" },
  { label: "Categories", disabled: true, to: "", icon: "mdi-filter-cog" },
  { label: "Templates", disabled: true, to: "", icon: "mdi-form-select" },
];
