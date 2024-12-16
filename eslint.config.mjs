import config from "eslint-config-standard";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // Main process (Node.js)
    files: ["src/main/**/*.js"],
    env: { node: true },
    extends: ["eslint:recommended"],
  },
  {
    // Renderer process (React in Browser)
    files: ["src/renderer/**/*.{js,jsx}"],
    env: { browser: true, node: false },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended", // Add React plugin
    ],
    plugins: ["react", "react-hooks"], // Include React plugins
    parserOptions: {
      ecmaVersion: 12,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true, // Enable JSX parsing
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Disable if using React 17+ (no need to import React in scope for JSX)
      "react/prop-types": "off", // Disable if you don't use PropTypes
      "react-hooks/rules-of-hooks": "error", // Enforce hooks rules
      "react-hooks/exhaustive-deps": "warn", // Warn about missing dependencies in useEffect
    },
  },
];
