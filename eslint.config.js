import { Linter } from 'eslint'
import typescriptEslintParser from '@typescript-eslint/parser'
import eslintPluginReact from 'eslint-plugin-react'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'

const { recommended: reactRecommended } = eslintPluginReact
const { recommended: typescriptEslintRecommended } = typescriptEslintPlugin

/** @type {Linter.FlatConfig} */
const config = [
  {
    languageOptions: {
      parser: typescriptEslintParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    plugins: {
      react: reactRecommended,
      '@typescript-eslint': typescriptEslintRecommended
    },
    rules: {
      semi: ['error', 'never'],
      'react/react-in-jsx-scope': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]

export default config