import { defineConfig } from "eslint/config";
import globals from "globals";

/** Runs prettier as eslint rule */
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";
/** Disables eslint rules which perform formatting */
import configPrettier from "eslint-config-prettier/flat";
/** ESLint Stylistic is a collection of stylistic rules for ESLint, migrated from eslint core and @typescript-eslint repo to shift the maintenance effort to the community. */
import pluginStylistic from "@stylistic/eslint-plugin";

import withNuxt from "./.nuxt/eslint.config.mjs";

/** Used to define files env as node */
const NODE_ENV_GLOBS = ["eslint.config.js"];

const createConfigs = () => {
  const ignoresConfig = createIgnoresConfigs();
  const prettierConfig = createPrettierConfig();
  const stylisticConfig = createStylisticConfig();
  const eslintConfig = createEslintConfig();
  const vueConfig = createVueConfig();

  return withNuxt(
    ...ignoresConfig.configs,
    ...eslintConfig.configs,
    ...stylisticConfig.configs,
    ...prettierConfig.configs,
    ...vueConfig.configs,
  );
};

export default createConfigs();

function createIgnoresConfigs() {
  const config = defineConfig({
    ignores: ["**/*.css", "**/node_modules", "**/.husky", "**/.git", "**/.vscode", "**/build", "**/.output", "**/public", "**/.nuxt"],
  });

  return { configs: [config] };
}

function createPrettierConfig() {
  const prettierSettings = {
    printWidth: 140,
    tabWidth: 2,
    endOfLine: "lf",
    singleAttributePerLine: true,
  };

  const configs = [
    pluginPrettierRecommended,
    configPrettier,
    {
      rules: {
        "prettier/prettier": ["error", prettierSettings],
      },
    },
  ];

  return { configs };
}

function createStylisticConfig() {
  const statementsWithBlankLine = [
    "block-like",
    "multiline-const",
    "multiline-let",
    "multiline-var",
    "multiline-expression",
    "class",
    "enum",
    "interface",
    "type",
  ];

  const config = {
    files: ["**/*.js", "**/*.cjs", "**/*.ts", "**/*.vue"],
    plugins: {
      "@stylistic": pluginStylistic,
    },
    rules: {
      "@stylistic/padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: statementsWithBlankLine,
          next: "*",
        },
        {
          blankLine: "always",
          prev: "*",
          next: [...statementsWithBlankLine, "return"],
        },
      ],
    },
  };

  return {
    configs: [config],
  };
}

function createEslintConfig() {
  return {
    configs: [
      {
        files: ["**/*.js"],
        languageOptions: {
          globals: {
            ...globals.browser,
          },
          ecmaVersion: "latest",
          sourceType: "module",
        },
      },
      {
        files: NODE_ENV_GLOBS,
        languageOptions: {
          globals: {
            ...globals.node,
          },
          ecmaVersion: "latest",
        },
      },
      {
        files: ["**/*.cjs"],
        languageOptions: {
          globals: {
            ...globals.node,
          },
          sourceType: "commonjs",
        },
      },
      {
        files: ["**/*.js", "**/*.cjs", "**/*.ts", "**/*.vue"],
        rules: {
          eqeqeq: "error",
          "no-var": "error",
          curly: ["error", "all"],
          "no-console": [
            "error",
            {
              allow: ["warn", "error", "debug"],
            },
          ],
          "arrow-body-style": ["error", "as-needed"],
          "no-warning-comments": [
            "error",
            {
              terms: ["todo", "fixme", "note"],
              location: "anywhere",
            },
          ],
        },
      },
    ],
  };
}

function createVueConfig() {
  const config = {
    files: ["**/*.vue"],
    rules: {
      "vue/attributes-order": [
        "error",
        {
          order: [
            "DEFINITION",
            "LIST_RENDERING",
            "CONDITIONALS",
            "RENDER_MODIFIERS",
            "GLOBAL",
            ["UNIQUE", "SLOT"],
            "TWO_WAY_BINDING",
            "OTHER_DIRECTIVES",
            "OTHER_ATTR",
            "EVENTS",
            "CONTENT",
          ],
          alphabetical: false,
        },
      ],
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "never",
            component: "always",
          },
          svg: "always",
          math: "always",
        },
      ],
      "vue/component-name-in-template-casing": [
        "error",
        "PascalCase",
        {
          registeredComponentsOnly: true,
        },
      ],
      "vue/custom-event-name-casing": [
        "error",
        "camelCase",
        {
          ignores: [],
        },
      ],
      "vue/component-definition-name-casing": ["error", "kebab-case"],
      "vue/attribute-hyphenation": ["error", "always"],
      "vue/v-on-event-hyphenation": [
        "error",
        "always",
        {
          autofix: true,
        },
      ],
      "vue/prefer-true-attribute-shorthand": ["error"],
      "vue/block-lang": [
        "error",
        {
          script: {
            lang: "ts",
          },
        },
      ],
      "vue/enforce-style-attribute": ["error", { allow: ["scoped"] }],
      "vue/multi-word-component-names": [
        "error",
        {
          ignores: ["app"],
        },
      ],
      "vue/padding-line-between-blocks": ["error", "always"],
      "vue/define-emits-declaration": ["error", "type-literal"],
    },
  };

  return {
    configs: [config],
  };
}
