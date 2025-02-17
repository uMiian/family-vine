import js from "@eslint/js";
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import pluginJest from 'eslint-plugin-jest';
import pluginReact from '@eslint-react/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["node_modules/", ".webpack/"], // Exclude .webpack directory
  },
  {
    // Main process (Node.js)
    files: ["src/main/**/*.js"],
    ...js.configs.recommended,
    plugins: { import: importPlugin },
    languageOptions: {
      sourceType: "module",
      globals: { ...globals.node },
    },
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["@main", "./src/main"],
            ["@models", "./src/main/models"],
            ["@services", "./src/main/services"],
            ["@handlers", "./src/main/handlers"],
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      'import/default': 'off', 
    },
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
    plugins: { jest: pluginJest, import: importPlugin },
      languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'import/default': 'off',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
];
