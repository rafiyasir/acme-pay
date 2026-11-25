import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import type { DatabaseHealth } from '../application/ports/database-health.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';
import { buildOpenApiDocument, type HealthDegraded, type HealthOk } from './openapi.js';

export interface AppDependencies {
  databaseHealth: DatabaseHealth;
  webOrigin: string;
}

export function createApp({ databaseHealth, webOrigin }: AppDependencies) {
  const app = express();

  // One origin only, never a wildcard.
  app.use(cors({ origin: [webOrigin] }));

  const openApiDocument = buildOpenApiDocument();
  app.get('/api/docs.json', (_req, res) => {
    res.json(openApiDocument);
  });
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

  app.get('/api/health', async (_req, res) => {
    const dbIsUp = await databaseHealth.isUp();
    if (!dbIsUp) {
      const body: HealthDegraded = { status: 'degraded', db: 'down' };
      res.status(503).json(body);
      return;
    }
    const body: HealthOk = { status: 'ok', db: 'ok' };
    res.json(body);
  });

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
