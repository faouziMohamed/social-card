import {z} from 'zod';

const _envSchema = z.object({
  NEXT_PUBLIC_DEPLOYMENT_URL: z.string().url().optional(),
});

type _Env = z.infer<typeof _envSchema>;

function resolveDeploymentUrl(): string {
  // Priority 1: Explicit env var
  if (process.env.NEXT_PUBLIC_DEPLOYMENT_URL) {
    return process.env.NEXT_PUBLIC_DEPLOYMENT_URL.replace(/\/$/, '');
  }

  // Priority 2: Vercel auto-set URL
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  // Priority 3: Local dev fallback
  return 'http://localhost:3000';
}

export const env = {
  deploymentURL: resolveDeploymentUrl(),
} as const;

export function getDeploymentUrl(): string {
  return env.deploymentURL;
}
