import {describe, expect, it, vi} from 'vitest';

import {resolveLogoParam} from '@/modules/seo/server/seo-handler.server';

describe('seo-handler.server', () => {
  describe('resolveLogoParam', () => {
    it('returns params unchanged when no logo', async () => {
      const params = {title: 'Test'};
      const result = await resolveLogoParam(params);
      expect(result).toEqual(params);
    });

    it('returns params unchanged when logo is non-HTTP', async () => {
      const params = {logo: '/local/logo.png', title: 'Test'};
      const result = await resolveLogoParam(params);
      expect(result.logo).toBe('/local/logo.png');
    });

    it('fetches and converts HTTP logo to base64', async () => {
      const mockBuffer = new ArrayBuffer(8);
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: {get: () => 'image/png'},
        arrayBuffer: () => Promise.resolve(mockBuffer),
      } as any);

      const params = {logo: 'https://example.com/logo.png'};
      const result = await resolveLogoParam(params);

      expect(result.logo).toMatch(/^data:image\/png;base64,/);
    });

    it('keeps original URL on fetch failure', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
      } as any);

      const params = {logo: 'https://example.com/logo.png'};
      const result = await resolveLogoParam(params);

      expect(result.logo).toBe('https://example.com/logo.png');
    });

    it('keeps original URL on network error', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const params = {logo: 'https://example.com/logo.png'};
      const result = await resolveLogoParam(params);

      expect(result.logo).toBe('https://example.com/logo.png');
    });

    it('preserves other params when converting logo', async () => {
      const mockBuffer = new ArrayBuffer(8);
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: {get: () => 'image/jpeg'},
        arrayBuffer: () => Promise.resolve(mockBuffer),
      } as any);

      const params = {
        logo: 'https://example.com/logo.jpg',
        title: 'My SEO Page',
        theme: 'light',
      };
      const result = await resolveLogoParam(params);

      expect(result.logo).toMatch(/^data:image\/jpeg;base64,/);
      expect(result.title).toBe('My SEO Page');
      expect(result.theme).toBe('light');
    });
  });
});
