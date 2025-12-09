export default {
  'client/**/*.{ts,tsx}': [
    'npm run lint --prefix client',
    () => 'npm run typecheck --prefix client',
  ],
  'server/**/*.ts': [
    'npm run lint --prefix server',
    () => 'npm run typecheck --prefix server',
  ],
};
