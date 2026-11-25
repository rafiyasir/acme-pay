import { loadConfig } from './config.js';
import { buildApp } from './container.js';
import { createDataSource } from './infrastructure/data-source.js';
import { logger } from './logger.js';

const config = loadConfig(process.env);

// Fail fast: an API that cannot reach its database should not start.
const dataSource = createDataSource(config.DATABASE_URL);
await dataSource.initialize();

const app = buildApp(dataSource, config.WEB_ORIGIN);
app.listen(config.PORT, () => logger.info(`API listening on port ${config.PORT}`));
