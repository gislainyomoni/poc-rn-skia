module.exports = {
  root: true,
  env: { node: true },
  extends: ['universe/native', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'import/export': 'off',
    'import/namespace': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      { additionalHooks: '(useAnimatedStyle|useDerivedValue|useAnimatedProps)' },
    ],
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external'], 'internal', 'unknown', ['parent', 'index', 'sibling']],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
}
