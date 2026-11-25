import { createDataSource } from './data-source.js';

// Entry point for the TypeORM CLI (`pnpm migrate`), which reads DATABASE_URL from the env file.
export default createDataSource(process.env.DATABASE_URL ?? '');
