export type Colors = 'primary' | 'secondary' | 'tertiary' | 'error' | 'primary-container' | 'secondary-container' | 'tertiary-container' | 'error-container'
export type Themes = 'light' | "dark" 

export type ColorProps = {
  /** Color(based on tokens) */
  color?: Colors;
  /** Color theme */
  theme?: Themes;
}
