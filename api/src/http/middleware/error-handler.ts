import type { ErrorRequestHandler } from 'express';
import { logger } from '../../logger.js';

// The one place errors are turned into responses. The real error is logged,
// never sent, so clients cannot see stack traces or internals.
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  logger.error({ err: error }, 'unexpected error');
  res
    .status(500)
    .json({ error: { code: 'INTERNAL_ERROR', message: 'Something went wrong', details: [] } });
};
