import { describe, expect, it } from 'vitest';
import { loadConfig } from './config.js';

describe('loadConfig', () => {
  it('fails with a clear message naming each invalid variable', () => {
    const badEnv = { DATABASE_URL: 'not-a-url', PORT: 'abc' };

    expect(() => loadConfig(badEnv)).toThrowError(
      /Invalid environment:[\s\S]*DATABASE_URL[\s\S]*WEB_ORIGIN[\s\S]*PORT/,
    );
  });
});
