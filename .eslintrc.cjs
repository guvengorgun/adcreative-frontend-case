module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh',"react", "react-hooks", "jsx-a11y", "prettier", "@typescript-eslint"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/jsx-filename-extension": [2, {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
    }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": "off",
    "react/prop-types": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "prettier/prettier": [
        "warn",
        {
            "singleQuote": true,
            "printWidth": 120,
            "endOfLine": "auto"
        }
    ],
    "react/jsx-props-no-spreading": "off",
    "react/display-name": "off",
    "@typescript-eslint/camelcase": "off",
    "import/prefer-default-export": "off",
    "react/no-array-index-key": "off",
    "react/require-default-props": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "no-debugger": "off"
  },
}
