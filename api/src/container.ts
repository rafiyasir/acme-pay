import type { DataSource } from 'typeorm';
import { createApp } from './http/app.js';
import { TypeormDatabaseHealth } from './infrastructure/typeorm-database-health.js';

// The only place that wires dependencies together.
export function buildApp(dataSource: DataSource, webOrigin: string) {
  const databaseHealth = new TypeormDatabaseHealth(dataSource);
  return createApp({ databaseHealth, webOrigin });
}
