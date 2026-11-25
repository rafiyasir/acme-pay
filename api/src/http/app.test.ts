import request from 'supertest';
import { describe, expect, it } from 'vitest';
import type { DatabaseHealth } from '../application/ports/database-health.js';
import { createApp } from './app.js';

const webOrigin = 'http://localhost:5173';

const healthyDatabase: DatabaseHealth = { isUp: async () => true };
const brokenDatabase: DatabaseHealth = { isUp: async () => false };

describe('GET /api/health', () => {
  it('returns 200 with db ok when the database responds', async () => {
    const app = createApp({ databaseHealth: healthyDatabase, webOrigin });

    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok', db: 'ok' });
  });

  it('returns 503 with db down when the database check fails', async () => {
    const app = createApp({ databaseHealth: brokenDatabase, webOrigin });

    const response = await request(app).get('/api/health');

    expect(response.status).toBe(503);
    expect(response.body).toEqual({ status: 'degraded', db: 'down' });
  });
});

describe('unknown routes', () => {
  it('returns 404 in the standard error shape', async () => {
    const app = createApp({ databaseHealth: healthyDatabase, webOrigin });

    const response = await request(app).get('/api/does-not-exist');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: { code: 'NOT_FOUND', message: 'Route not found', details: [] },
    });
  });
});
