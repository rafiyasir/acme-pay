import type { DataSource } from 'typeorm';
import type { DatabaseHealth } from '../application/ports/database-health.js';
import { logger } from '../logger.js';

export class TypeormDatabaseHealth implements DatabaseHealth {
  constructor(private readonly dataSource: DataSource) {}

  async isUp() {
    try {
      await this.dataSource.query('SELECT 1');
      return true;
    } catch (error) {
      logger.warn({ err: error }, 'database health check failed');
      return false;
    }
  }
}
