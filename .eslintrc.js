module.exports = {
  extends: ["plugin:@typescript-eslint/recommended"],
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
