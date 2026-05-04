import {afterEach, beforeEach, describe, expect, it} from 'vitest';

// Need to import the module but we'll test resolveDeploymentUrl directly
import {resolveDeploymentUrl} from '@/lib/env';

describe('env', () => {
  const originalEnv = {...process.env};

  beforeEach(() => {
    // Clear relevant env vars before each test
    delete process.env.NEXT_PUBLIC_DEPLOYMENT_URL;
    delete process.env.NEXT_PUBLIC_VERCEL_URL;
  });

  afterEach(() => {
    // Restore original env
    process.env = originalEnv;
  });

  describe('resolveDeploymentUrl', () => {
    it('returns explicit NEXT_PUBLIC_DEPLOYMENT_URL when set', () => {
      process.env.NEXT_PUBLIC_DEPLOYMENT_URL = 'https://my-app.com';
      expect(resolveDeploymentUrl()).toBe('https://my-app.com');
    });

    it('removes trailing slash from NEXT_PUBLIC_DEPLOYMENT_URL', () => {
      process.env.NEXT_PUBLIC_DEPLOYMENT_URL = 'https://my-app.com/';
      expect(resolveDeploymentUrl()).toBe('https://my-app.com');
    });

    it('uses NEXT_PUBLIC_VERCEL_URL when set', () => {
      process.env.NEXT_PUBLIC_VERCEL_URL = 'my-app.vercel.app';
      expect(resolveDeploymentUrl()).toBe('https://my-app.vercel.app');
    });

    it('prioritizes NEXT_PUBLIC_DEPLOYMENT_URL over NEXT_PUBLIC_VERCEL_URL', () => {
      process.env.NEXT_PUBLIC_DEPLOYMENT_URL = 'https://explicit.com';
      process.env.NEXT_PUBLIC_VERCEL_URL = 'my-app.vercel.app';
      expect(resolveDeploymentUrl()).toBe('https://explicit.com');
    });

    it('falls back to localhost in development', () => {
      expect(resolveDeploymentUrl()).toBe('http://localhost:3000');
    });
  });
});
