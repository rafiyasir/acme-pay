// Integration tests must never run against another database by accident.
import { loadEnvFile } from 'node:process';

try {
  loadEnvFile('.env.test');
} catch {
  // The file is optional if the variable is already set in the shell.
}

if (!process.env.TEST_DATABASE_URL) {
  process.stderr.write('TEST_DATABASE_URL is not set. Add it to api/.env.test and try again.\n');
  process.exit(1);
}
