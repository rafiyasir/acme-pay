import { z } from 'zod';

const configSchema = z.object({
  DATABASE_URL: z.url(),
  // Browsers send the origin without a path, so a trailing slash would never match in CORS.
  WEB_ORIGIN: z
    .url()
    .refine(
      (value) => new URL(value).origin === value,
      'must be an origin like https://app.example.com, with no path or trailing slash',
    ),
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
