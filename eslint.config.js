// Install dependencies
// ni -D eslint eslint-config-flat-gitignore @eslint/js @stylistic/eslint-plugin eslint-plugin-unicorn eslint-plugin-simple-import-sort

import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import gitignore from 'eslint-config-flat-gitignore'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

const GLOB_SRC = '**/*.?([cm])[jt]s?(x)'

function createFlatConfig(config) {
  if (Array.isArray(config)) {
    return config.map(element => createFlatConfig(element))
  }

  const configKeys = Object.keys(config)
  if (configKeys.length === 1 && configKeys[0] === 'ignores')
    return config

  if (!config?.files) {
    return {
      ...config,
      files: [GLOB_SRC],
    }
  }
  return config
}

export default createFlatConfig([
  gitignore({
    files: [
      '.gitignore',
      '.eslintignore',
    ],
    strict: false,
  }),
  js.configs.recommended,
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
])
