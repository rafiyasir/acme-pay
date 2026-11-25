import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['**/dist/**', '**/node_modules/**', 'docs/**', 'private/**'] },
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'error',
      // Express needs the 4th argument to treat a function as an error handler.
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
);
