import request from 'supertest';
import { describe, expect, it } from 'vitest';
import type { DatabaseHealth } from '../application/ports/database-health.js';
import { createApp } from './app.js';

const webOrigin = 'http://localhost:5173';

const healthyDatabase: DatabaseHealth = { isUp: async () => true };

describe('GET /api/health', () => {
  it('returns 200 with db ok when the database responds', async () => {
    const app = createApp({ databaseHealth: healthyDatabase, webOrigin });

    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok', db: 'ok' });
  });
});
