import {
  extendZodWithOpenApi,
  OpenApiGeneratorV31,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

const healthOk = z.object({ status: z.literal('ok'), db: z.literal('ok') });
const healthDegraded = z.object({ status: z.literal('degraded'), db: z.literal('down') });

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: 'get',
  path: '/api/health',
  summary: 'Check that the API and the database are up',
  responses: {
    200: {
      description: 'API and database are up',
      content: { 'application/json': { schema: healthOk } },
    },
    503: {
      description: 'The database check failed',
      content: { 'application/json': { schema: healthDegraded } },
    },
  },
});

export function buildOpenApiDocument() {
  return new OpenApiGeneratorV31(registry.definitions).generateDocument({
    openapi: '3.1.0',
    info: { title: 'acme-pay API', version: '1.0.0' },
  });
}
