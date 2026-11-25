// Vitest does not read .env.test on its own; integration tests need TEST_DATABASE_URL.
process.loadEnvFile('.env.test');
