import express from 'express';
import { errorHandler } from './middleware/error-handler.js';
import type { DatabaseHealth } from '../application/ports/database-health.js';

export interface AppDependencies {
  databaseHealth: DatabaseHealth;
  webOrigin: string;
}

export function createApp({ databaseHealth }: AppDependencies) {
  const app = express();

  app.get('/api/health', async (_req, res) => {
    const dbIsUp = await databaseHealth.isUp();
    if (!dbIsUp) {
      res.status(503).json({ status: 'degraded', db: 'down' });
      return;
    }
    res.json({ status: 'ok', db: 'ok' });
  });

  app.use((_req, res) => {
    res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found', details: [] } });
  });

  app.use(errorHandler);

  return app;
}
