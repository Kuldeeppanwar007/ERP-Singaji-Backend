module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "comma-dangle": 1,
    "no-underscore-dangle": 0,
    "operator-linebreak": 0,
    "object-curly-newline": 0,
    "no-param-reassign": [2, { props: false }],
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
