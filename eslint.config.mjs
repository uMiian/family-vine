import js from "@eslint/js";
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';

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
];
