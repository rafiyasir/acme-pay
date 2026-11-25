import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    env: { LOG_LEVEL: 'silent' },
    projects: [
      {
        test: {
          name: 'unit',
          include: ['src/**/*.test.ts'],
          exclude: ['src/**/*.integration.test.ts'],
        },
      },
      {
        test: {
          name: 'integration',
          include: ['src/**/*.integration.test.ts'],
          setupFiles: ['test/load-env-test.ts'],
        },
      },
    ],
  },
});
