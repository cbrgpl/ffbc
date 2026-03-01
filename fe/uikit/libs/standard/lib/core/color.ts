export type Colors =
  | "primary"
  | "secondary"
  | "tertiary"
  | "error"
  | "primary-container"
  | "secondary-container"
  | "tertiary-container"
  | "error-container";
export type Themes = "light" | "dark";

export type ColorProps<C extends Colors = Colors> = {
  /** Color(based on tokens) */
  color?: C;
  /** Color theme */
  theme?: Themes;
};
