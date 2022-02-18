module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "eslint-disable-next-line": "no-return-await",
    "linebreak-style": 0,
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "import/prefer-default-export": 0,
    "no-console": ["error", { allow: ["warn", "error"] }],
    "consistent-return": "off",
  },
};
