// Install dependencies
// ni -D eslint eslint-config-flat-gitignore @eslint/js @stylistic/eslint-plugin eslint-plugin-unicorn eslint-plugin-simple-import-sort

import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import gitignore from 'eslint-config-flat-gitignore'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

const GLOB_SRC = '**/*.?([cm])[jt]s?(x)'

export default [
  gitignore({
    files: [
      '.gitignore',
      '.eslintignore',
    ],
    strict: false,
  }),
  {
    files: [GLOB_SRC],
    rules: js.configs.recommended.rules,
  },
  stylistic.configs['recommended-flat'],
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
]
