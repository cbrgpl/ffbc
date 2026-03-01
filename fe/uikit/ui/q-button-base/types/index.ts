export type ButtonBaseVariants =
  | "primary"
  | "secondary"
  | "tertiary"
  | "primary-container"
  | "secondary-container"
  | "tertiary-container"
  | "outline-variant"
  | "primary-text"
  | "inverse-surface"
  | "surface-container-low"
  | "surface-container"
  | "surface-variant-text";

export type ButtonForm = "square" | "round";

/** Only inheritable props */
export type ButtonBaseProps = {
  /** Button form */
  form?: ButtonForm;
  /** Allows change native type attribute of the button */
  type?: "reset" | "button" | "submit";
};

export type ButtonContentProps = {
  /** Being displayed text */
  text?: string;
};
