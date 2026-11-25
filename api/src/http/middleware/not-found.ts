import type { RequestHandler } from 'express';
import { errorBody } from '../error-body.js';

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json(errorBody('NOT_FOUND', 'Route not found'));
};
