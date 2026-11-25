import { fileURLToPath } from 'node:url';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const migrations = fileURLToPath(new URL('./migrations/*.{ts,js}', import.meta.url));

// No entities yet. Schema changes only through migrations, never synchronize.
export function createDataSource(url: string) {
  return new DataSource({
    type: 'postgres',
    url,
    entities: [],
    migrations: [migrations],
    synchronize: false,
    extra: { max: 5 },
  });
}
