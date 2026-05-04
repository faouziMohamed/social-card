import {beforeEach, describe, expect, it, vi} from 'vitest';

import {resolveImageParams} from '@/modules/og/server/og-handler.server';

describe('og-handler.server', () => {
  describe('resolveImageParams', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it('passes through non-image params unchanged', async () => {
      const params = {
        title: 'Hello World',
        count: 42,
        dark: true,
      };

      const result = await resolveImageParams(params);
      expect(result).toEqual(params);
    });

    it('passes through non-HTTP image params unchanged', async () => {
      const params = {
        logo: '/local/logo.png',
        title: 'Test',
      };

      const result = await resolveImageParams(params);
      expect(result.logo).toBe('/local/logo.png');
    });

    it('fetches and converts HTTP image URLs to base64', async () => {
      const mockBuffer = new ArrayBuffer(8);
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: {get: () => 'image/png'},
        arrayBuffer: () => Promise.resolve(mockBuffer),
      } as any);

      const params = {
        logo: 'https://example.com/logo.png',
        title: 'Test',
      };

      const result = await resolveImageParams(params);
      expect(result.logo).toMatch(/^data:image\/png;base64,/);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://example.com/logo.png',
        {headers: {Accept: 'image/*'}},
      );
    });

    it('handles all known image keys', async () => {
      const mockBuffer = new ArrayBuffer(8);
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: {get: () => 'image/jpeg'},
        arrayBuffer: () => Promise.resolve(mockBuffer),
      } as any);

      const imageKeys = [
        'logo',
        'authorPhoto',
        'banner',
        'screenshot',
        'avatar',
        'publicationLogo',
      ];
      const params: Record<string, unknown> = {};

      for (const key of imageKeys) {
        params[key] = 'https://example.com/image.jpg';
      }

      const result = await resolveImageParams(params);

      for (const key of imageKeys) {
        expect((result as Record<string, unknown>)[key]).toMatch(
          /^data:image\/jpeg;base64,/,
        );
      }
    });

    it('keeps original URL on fetch failure', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
      } as any);

      const params = {
        logo: 'https://example.com/logo.png',
      };

      const result = await resolveImageParams(params);
      expect(result.logo).toBe('https://example.com/logo.png');
    });

    it('keeps original URL on network error', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const params = {
        logo: 'https://example.com/logo.png',
      };

      const result = await resolveImageParams(params);
      expect(result.logo).toBe('https://example.com/logo.png');
    });
  });
});
