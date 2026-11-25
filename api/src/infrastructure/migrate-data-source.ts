import { createDataSource } from './data-source.js';

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    'DATABASE_URL is not set. Put it in api/.env.development or set it in the shell.',
  );
}

// Entry point for the TypeORM CLI (`pnpm migrate`). The shell value wins over the env file,
// so `DATABASE_URL=<branch url> pnpm migrate` targets any Neon branch.
export default createDataSource(url);
