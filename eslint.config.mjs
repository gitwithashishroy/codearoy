import nextPlugin from '@next/eslint-plugin-next';

export default [
  {
    ignores: ['node_modules', '.next', 'out'],
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
];
