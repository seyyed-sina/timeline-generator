import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    // "plugin:sonarjs/recommended-legacy"
  ),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "react/jsx-key": "off",
      "react/jsx-no-undef": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react/no-unknown-property": "off",
      "react/no-array-index-key": "off",
      "react/no-children-prop": "off",
      "react/no-danger": "off",
      "react/no-deprecated": "off",
      "import/no-unresolved": "warn",
      // "sonarjs/no-duplicate-string": [
      //   "warn",
      //   {
      //     threshold: 5,
      //   },
      // ],
      // "sonarjs/no-unused-expressions": [
      //   "error",
      //   {
      //     allowShortCircuit: true,
      //   },
      // ],

      // "sonarjs/todo-tag": "off",
      // "sonarjs/unused-import": "warn",
      // "sonarjs/no-commented-code": "off",
      // "sonarjs/new-cap": "off",
      // "sonarjs/jsx-no-useless-fragment": "warn",
      // "sonarjs/no-array-index-key": "warn",
      // "sonarjs/pseudo-random": "warn",
      // "sonarjs/prefer-nullish-coalescing": "warn",
      // "sonarjs/cognitive-complexity": ["warn", 20],
      // "sonarjs/no-misused-promises": "off",
      // "sonarjs/mouse-events-a11y": "off",
      // "sonarjs/sonar-no-unused-vars": "warn",
      // "sonarjs/no-dead-store": "warn",

      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal"],

          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],

          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",

          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];

export default eslintConfig;
