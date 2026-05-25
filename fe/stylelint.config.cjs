module.exports = {
  ignoreFiles: ["**/dist", "**/dist/**"],
  plugins: ["stylelint-prettier"],
  extends: ["stylelint-config-html", "stylelint-config-standard", "stylelint-config-recommended-vue", "stylelint-config-clean-order/error"],
  rules: {
    "prettier/prettier": true,
    "selector-class-pattern": null,
    "custom-property-pattern": null,
    "alpha-value-notation": "number",
    "color-function-notation": "modern",
    "custom-property-empty-line-before": "never",
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["theme"],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "slotted", "deep"],
        severity: "warning",
        message: "Запрещенный псевдокласс",
      },
    ],
    "rule-empty-line-before": [
      "always",
      {
        except: ["first-nested"],
        ignore: ["after-comment"],
      },
    ],
    "selector-type-case": "lower",
  },
};
