module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
    'plugin:import/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import', 'simple-import-sort'],
  rules: {
    // 关闭 any 类型警告
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  settings: {
    'import/resolver': {
      webpack: true,
      typescript: true,
      node: true,
    },
  },
}
