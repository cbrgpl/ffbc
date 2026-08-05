import type { NavigationMenuItem } from "@nuxt/ui";

export enum MainLayoutRouteNames {
  HOME = "Home",
  SERVICES = "Services",
  INPUT_CHARACTERISTICS = "InputCharsList",
  CATEGORIES = "ErrorHappen",
  TEMPLATES = "ErrorHappen",
}

export const mainLayoutNavigation: Array<NavigationMenuItem> = [
  {
    label: "Home",
    to: { name: MainLayoutRouteNames.HOME },
    icon: "i-mdi-home-account",
  },
  { label: "Services", to: { name: MainLayoutRouteNames.SERVICES }, icon: "i-mdi-room-service" },
  { label: "Categories", disabled: true, to: { name: MainLayoutRouteNames.CATEGORIES }, icon: "i-mdi-filter-cog" },
  {
    label: "Input Characteristics",
    icon: "i-mdi-form-select",
    children: [
      {
        label: "Characteristics",
        to: { name: MainLayoutRouteNames.INPUT_CHARACTERISTICS },
        icon: "i-mdi-format-list-bulleted",
      },
      {
        label: "Templates",
        disabled: true,
        to: { name: MainLayoutRouteNames.TEMPLATES },
        icon: "i-mdi-file-document-outline",
      },
    ],
  },
];
