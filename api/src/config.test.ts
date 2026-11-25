import { describe, expect, it } from 'vitest';
import { loadConfig } from './config.js';

describe('loadConfig', () => {
  it('fails with a clear message naming each invalid variable', () => {
    const badEnv = { DATABASE_URL: 'not-a-url', PORT: 'abc' };

    expect(() => loadConfig(badEnv)).toThrowError(
      /Invalid environment:[\s\S]*DATABASE_URL[\s\S]*WEB_ORIGIN[\s\S]*PORT/,
    );
  });

  it('rejects a web origin with a trailing slash, which would never match the browser origin', () => {
    const env = {
      DATABASE_URL: 'postgresql://user:pass@host/db',
      WEB_ORIGIN: 'https://acme-pay.vercel.app/',
    };

    expect(() => loadConfig(env)).toThrowError(/WEB_ORIGIN/);
  });
});
