// Install dependencies
// ni -D eslint eslint-config-flat-gitignore @eslint/js @stylistic/eslint-plugin eslint-plugin-unicorn eslint-plugin-simple-import-sort eslint-plugin-antfu

import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import gitignore from 'eslint-config-flat-gitignore'
import eslintPluginAntfu from 'eslint-plugin-antfu'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

const GLOB_SRC = '**/*.?([cm])[jt]s?(x)'

function createFlatConfig(config) {
  if (Array.isArray(config)) {
    return config.map(element => createFlatConfig(element))
  }

  const configKeys = Object.keys(config)
  if (configKeys.length === 1 && configKeys[0] === 'ignores')
    return {
      ...config,
      name: 'Global ignores',
    }

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
  {
    name: 'Basic JavaScript rules',
    rules: {
      ...js.configs.recommended.rules,
      'prefer-template': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    name: 'Stylistic rules for formatting',
    ...stylistic.configs['recommended-flat'],
  },
  {
    name: 'Antfu rules',
    plugins: {
      antfu: eslintPluginAntfu,
    },
    rules: {
      'antfu/consistent-list-newline': 'error',
      'antfu/if-newline': 'error',
      'antfu/top-level-function': 'error',

      'antfu/import-dedupe': 'error',
      'antfu/no-import-dist': 'error',
      'antfu/no-import-node-modules-by-path': 'error',
    },
  },
  {
    name: 'Unicorn rules',
    ...eslintPluginUnicorn.configs['flat/recommended'],
  },
  {
    name: 'Simple import sort',
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
])
