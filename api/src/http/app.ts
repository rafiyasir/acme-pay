import express from 'express';
import type { DatabaseHealth } from '../application/ports/database-health.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';

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

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
