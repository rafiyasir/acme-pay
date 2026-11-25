import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['**/dist/**', '**/node_modules/**', 'docs/**', 'private/**'] },
  ...tseslint.configs.recommended,
  { rules: { 'no-console': 'error' } },
);
