import express from 'express';
import type { DatabaseHealth } from '../application/ports/database-health.js';

export interface AppDependencies {
  databaseHealth: DatabaseHealth;
  webOrigin: string;
}

export function createApp({ databaseHealth }: AppDependencies) {
  const app = express();

  app.get('/api/health', async (_req, res) => {
    const dbIsUp = await databaseHealth.isUp();
    res.json({ status: 'ok', db: dbIsUp ? 'ok' : 'down' });
  });

  return app;
}
