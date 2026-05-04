import {describe, expect, it} from 'vitest';
import {SocialCardClient} from './client';

describe('SocialCardClient', () => {
  describe('constructor defaults', () => {
    it('uses default baseUrl when none provided', () => {
      const client = new SocialCardClient();
      expect(client.getBaseUrl()).toBe('https://social-card.mfaouzi.com');
    });

    it('uses default theme "dark"', () => {
      const client = new SocialCardClient();
      expect(client.getDefaultTheme()).toBe('dark');
    });

    it('uses default accentColor "#6366f1"', () => {
      const client = new SocialCardClient();
      expect(client.getDefaultAccentColor()).toBe('#6366f1');
    });
  });

  describe('constructor with config', () => {
    it('accepts custom baseUrl and strips trailing slash', () => {
      const client = new SocialCardClient({
        baseUrl: 'https://my-instance.com/',
      });
      expect(client.getBaseUrl()).toBe('https://my-instance.com');
    });

    it('accepts custom theme "light"', () => {
      const client = new SocialCardClient({defaultTheme: 'light'});
      expect(client.getDefaultTheme()).toBe('light');
    });

    it('accepts custom accentColor', () => {
      const client = new SocialCardClient({defaultAccentColor: '#3b82f6'});
      expect(client.getDefaultAccentColor()).toBe('#3b82f6');
    });

    it('throws on invalid defaultTheme', () => {
      expect(
        () =>
          new SocialCardClient({defaultTheme: 'purple' as 'dark' | 'light'}),
      ).toThrow("defaultTheme must be 'dark' or 'light'");
    });

    it('throws on invalid accentColor', () => {
      expect(() => new SocialCardClient({defaultAccentColor: 'red'})).toThrow(
        'must be a valid hex color',
      );
    });
  });

  describe('buildUrl', () => {
    it('constructs URL with default params', () => {
      const client = new SocialCardClient({baseUrl: 'https://example.com'});
      const url = client.buildUrl('/api/og/general', {title: 'Hello World'});
      expect(url).toContain('title=Hello+World');
      expect(url).toContain('theme=dark');
      expect(url).toContain('accentColor=%236366f1');
    });

    it('merges passed params over defaults', () => {
      const client = new SocialCardClient({
        baseUrl: 'https://example.com',
        defaultTheme: 'dark',
      });
      const url = client.buildUrl('/api/og/general', {theme: 'light'});
      // params override defaults
      expect(url).toContain('theme=light');
    });

    it('omits undefined and null values', () => {
      const client = new SocialCardClient({baseUrl: 'https://example.com'});
      const url = client.buildUrl('/api/og/general', {
        title: undefined,
        desc: null,
      });
      expect(url).not.toContain('title=');
      expect(url).not.toContain('desc=');
    });
  });

  describe('module accessors', () => {
    it('exposes og module', () => {
      const client = new SocialCardClient();
      expect(client.og).toBeDefined();
    });

    it('exposes badge module', () => {
      const client = new SocialCardClient();
      expect(client.badge).toBeDefined();
    });

    it('exposes seo module', () => {
      const client = new SocialCardClient();
      expect(client.seo).toBeDefined();
    });
  });
});
