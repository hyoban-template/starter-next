import gitignore from 'eslint-config-flat-gitignore'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

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
  {
    ...stylistic.configs['recommended-flat'],
    files: [GLOB_SRC],
  },
]
