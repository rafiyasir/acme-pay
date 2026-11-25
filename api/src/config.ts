import { z } from 'zod';

const configSchema = z.object({
  DATABASE_URL: z.url(),
  WEB_ORIGIN: z.url(),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
});

// Fails fast at startup with one message listing every problem.
export function loadConfig(env: Record<string, string | undefined>) {
  const result = configSchema.safeParse(env);
  if (!result.success) {
    const problems = result.error.issues.map(
      (issue) => `  ${issue.path.join('.')}: ${issue.message}`,
    );
    throw new Error(`Invalid environment:\n${problems.join('\n')}`);
  }
  return result.data;
}
