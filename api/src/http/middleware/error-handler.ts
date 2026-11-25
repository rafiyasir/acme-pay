import type { ErrorRequestHandler } from 'express';
import { logger } from '../../logger.js';
import { errorBody } from '../error-body.js';

// The one place errors are turned into responses. The real error is logged,
// never sent, so clients cannot see stack traces or internals.
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  logger.error({ err: error }, 'unexpected error');
  res.status(500).json(errorBody('INTERNAL_ERROR', 'Something went wrong'));
};
