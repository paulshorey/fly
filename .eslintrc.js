module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  // This fixes a notice in CLI when running lint:
  // settings: {
  //   react: {
  //     version: 'detect',
  //   },
  // },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  ignorePatterns: ['node_modules/*', '.next/*', '.out/*', '!.prettierrc.js'],
  plugins: ['react', 'eslint-plugin-no-inline-styles'],
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unescaped-entities': 'warn',
    'react/require-default-props': 'warn',
    'react/forbid-prop-types': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'semi': ['error', 'always'],
    // 'quotes': ['error', 'single'],
    // 'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'object-curly-spacing': ['error', 'always'],
    'keyword-spacing': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-trailing-spaces': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      settings: { react: { version: 'detect' } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        'react/prop-types': 'off',
        'react/jsx-indent-props': [2, 2],
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-empty-function': 'off',
        'jsx-a11y/no-autofocus': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'react-hooks/exhaustive-deps': 'off',
        // 'react/jsx-first-prop-new-line': [2, 'always'],
        // 'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'always' }],
        // 'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
        // 'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
        // 'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'always' }],
      },
    },
  ],
};
