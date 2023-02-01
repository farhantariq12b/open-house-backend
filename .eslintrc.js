module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest"
  },

  rules: {
    "comma-dangle": ["error", "never"],
    "no-unused-vars": ["warn"],
    "no-var": ["off"],
    "one-var": ["off"]
  }
};
