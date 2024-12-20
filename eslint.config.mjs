import js from "@eslint/js";
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import pluginJest from 'eslint-plugin-jest';
import pluginReact from '@eslint-react/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // Main process (Node.js)
    files: ["src/main/**/*.js"],
    ...js.configs.recommended,
    ...importPlugin.flatConfigs.recommended,
    languageOptions: {
      sourceType: "module",
      globals: { ...globals.node }
    }
  },
  {
    // Renderer process (Broswer)
    files: ["src/renderer/**/*.{jsx, js}"],
    ...pluginReact.configs["react"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    // Jest Tests
    files: ["tests/**/*.test.js"],
    plugins: { jest: pluginJest },
      languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
];
