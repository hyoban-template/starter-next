import process from "node:process"
import react from "@eslint-react/eslint-plugin"
import next from "@next/eslint-plugin-next"
import ts from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import eslintConfigPrettier from "eslint-config-prettier"
import jsxA11y from "eslint-plugin-jsx-a11y"
import reactHooks from "eslint-plugin-react-hooks"
import unicorn from "eslint-plugin-unicorn"

const files = ["src/**/*.{ts,tsx}"]
const languageOptions = {
  parser: tsParser,
  parserOptions: {
    project: true,
    tsconfigRootDir: process.cwd(),
  },
}
const linterOptions = {
  reportUnusedDisableDirectives: true,
}
const plugins = {
  "@typescript-eslint": ts,
  unicorn,
  "jsx-a11y": jsxA11y,
  "react-hooks": reactHooks,
  ...react.configs.all.plugins,
  "@next/next": next,
}

export default [
  // don't lint js files
  {
    ignores: ["**/*.js", "**/*.cjs", "**/*.mjs"],
  },
  {
    files,
    languageOptions,
    linterOptions,
    plugins,
    rules: {
      ...ts.configs["eslint-recommended"].overrides[0].rules,
      ...ts.configs["strict-type-checked"].rules,
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-import-type-side-effects": "error",

      ...unicorn.configs.recommended.rules,
      "unicorn/prevent-abbreviations": "off",

      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  // react
  {
    files,
    languageOptions,
    linterOptions,
    plugins,
    rules: {
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            arguments: false,
            attributes: false,
          },
        },
      ],

      ...jsxA11y.configs.recommended.rules,
      ...react.configs.all.rules,
      ...reactHooks.configs.recommended.rules,
      ...next.configs.recommended.rules,
    },
  },
  {
    files,
    ignores: [
      // https://nextjs.org/docs/getting-started/project-structure#routing-files
      "src/app/**/{layout,page,loding,not-found,error,global-error,route,template,default}.tsx",
    ],
    languageOptions,
    linterOptions,
    plugins,
    rules: {
      // disable export * and enum
      "no-restricted-syntax": [
        "error",
        {
          selector: ":matches(ExportAllDeclaration)",
          message: "Export only modules you need.",
        },
        {
          selector: "TSEnumDeclaration",
          message: "We should not use Enum",
        },
      ],
      "no-restricted-exports": [
        "error",
        {
          restrictDefaultExports: { direct: true },
        },
      ],
    },
  },
  // disable formatting rules, make sure to put this last
  eslintConfigPrettier,
]
