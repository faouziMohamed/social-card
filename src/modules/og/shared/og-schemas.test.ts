import {describe, expect, it} from 'vitest';

import {
  articleSchema,
  baseSchema,
  blogSchema,
  changelogSchema,
  eventSchema,
  generalSchema,
  gradientSchema,
  launchSchema,
  minimalSchema,
  portfolioSchema,
  productSchema,
  quoteSchema,
} from '@/modules/og/shared/og-schemas';

describe('OG Schemas Validation', () => {
  describe('baseSchema', () => {
    it('applies default values', () => {
      const result = baseSchema.parse({});
      expect(result).toMatchObject({
        theme: 'dark',
        target: 'og',
        fontFamily: 'geist',
        bgTone: 'dark',
        bgStyle: 'gradient+grid',
        logoWidth: 100,
      });
    });

    it('accepts valid theme values', () => {
      for (const theme of ['dark', 'light', 'auto']) {
        expect(() => baseSchema.parse({theme})).not.toThrow();
      }
    });

    it('rejects invalid theme values', () => {
      expect(() => baseSchema.parse({theme: 'invalid'})).toThrow();
    });

    it('accepts valid target platforms', () => {
      for (const target of [
        'og',
        'twitter-large',
        'twitter-small',
        'linkedin',
      ]) {
        expect(() => baseSchema.parse({target})).not.toThrow();
      }
    });

    it('validates hex colors for bgCustomColor', () => {
      expect(() => baseSchema.parse({bgCustomColor: '#ff0000'})).not.toThrow();
      expect(() => baseSchema.parse({bgCustomColor: '#f00'})).not.toThrow();
      expect(() => baseSchema.parse({bgCustomColor: 'red'})).toThrow();
    });

    it('validates logo as URL', () => {
      expect(() =>
        baseSchema.parse({logo: 'https://example.com/logo.png'}),
      ).not.toThrow();
      expect(() => baseSchema.parse({logo: '/local/logo.png'})).toThrow();
    });
  });

  describe('generalSchema', () => {
    it('has optional title with default', () => {
      const result = generalSchema.parse({});
      expect(result.title).toBeUndefined();
      expect(result.siteName).toBe('Site Name');
    });

    it('accepts valid general params', () => {
      const result = generalSchema.parse({
        title: 'Hello World',
        description: 'Subtitle text',
        accentColor: '#6366f1',
      });
      expect(result.title).toBe('Hello World');
      expect(result.description).toBe('Subtitle text');
      expect(result.accentColor).toBe('#6366f1');
    });

    it('merges with base schema defaults', () => {
      const result = generalSchema.parse({title: 'Test'});
      expect(result.theme).toBe('dark');
      expect(result.target).toBe('og');
    });
  });

  describe('gradientSchema', () => {
    it('has optional title with default', () => {
      const result = gradientSchema.parse({});
      expect(result.title).toBeUndefined();
      expect(result.siteName).toBe('Site Name');
    });

    it('accepts valid gradient params', () => {
      const result = gradientSchema.parse({
        title: 'Gradient Title',
        gradientFrom: '#00e887',
        gradientAngle: 90,
      });
      expect(result.title).toBe('Gradient Title');
      expect(result.gradientFrom).toBe('#00e887');
    });
  });

  describe('blogSchema', () => {
    it('has optional title and authorName', () => {
      const result = blogSchema.parse({});
      expect(result.title).toBe('Blog Title');
      expect(result.authorName).toBeUndefined();
    });

    it('accepts valid blog params', () => {
      const result = blogSchema.parse({
        title: 'Blog Post',
        authorName: 'Jane Doe',
        authorPhoto: 'https://example.com/avatar.jpg',
        publishDate: '2026-05-04',
      });
      expect(result.title).toBe('Blog Post');
      expect(result.authorName).toBe('Jane Doe');
    });
  });

  describe('minimalSchema', () => {
    it('has optional title with default', () => {
      const result = minimalSchema.parse({});
      expect(result.title).toBe('Title');
    });

    it('accepts minimal params with only title', () => {
      const result = minimalSchema.parse({title: 'Minimal'});
      expect(result.title).toBe('Minimal');
    });
  });

  describe('articleSchema', () => {
    it('has optional title and authorName', () => {
      const result = articleSchema.parse({});
      expect(result.title).toBe('Article Title');
      expect(result.authorName).toBeUndefined();
    });

    it('accepts valid article params', () => {
      const result = articleSchema.parse({
        title: 'Article Title',
        authorName: 'Author Name',
        accentColor: '#f59e0b',
      });
      expect(result.title).toBe('Article Title');
      expect(result.accentColor).toBe('#f59e0b');
    });
  });

  describe('productSchema', () => {
    it('has optional productName with default', () => {
      const result = productSchema.parse({});
      expect(result.productName).toBe('Product');
    });

    it('accepts valid product params', () => {
      const result = productSchema.parse({
        productName: 'Product',
        tagline: '$99',
        badge: '4.5',
      });
      expect(result.productName).toBe('Product');
      expect(result.tagline).toBe('$99');
    });
  });

  describe('portfolioSchema', () => {
    it('has optional name with default', () => {
      const result = portfolioSchema.parse({});
      expect(result.name).toBe('Your Name');
    });

    it('accepts valid portfolio params', () => {
      const result = portfolioSchema.parse({
        name: 'John Doe',
        role: 'Developer',
        available: 'true',
      });
      expect(result.name).toBe('John Doe');
      expect(result.available).toBe('true');
    });
  });

  describe('quoteSchema', () => {
    it('has default quote text', () => {
      const result = quoteSchema.parse({});
      expect(result.quote).toBe('Build fast. Ship often.');
    });

    it('accepts valid quote params', () => {
      const result = quoteSchema.parse({
        quote: 'Code is poetry',
        author: 'Developer',
        accentColor: '#14b8a6',
      });
      expect(result.quote).toBe('Code is poetry');
      expect(result.author).toBe('Developer');
    });
  });

  describe('changelogSchema', () => {
    it('has default values', () => {
      const result = changelogSchema.parse({});
      expect(result.productName).toBe('Social Card');
      expect(result.version).toBe('v2.0.0');
    });

    it('accepts valid changelog params', () => {
      const result = changelogSchema.parse({
        productName: 'My App',
        version: 'v1.0.0',
        headline: 'New features',
      });
      expect(result.productName).toBe('My App');
      expect(result.version).toBe('v1.0.0');
    });
  });

  describe('eventSchema', () => {
    it('has default event name', () => {
      const result = eventSchema.parse({});
      expect(result.eventName).toBe('Event Name');
    });

    it('accepts valid event params', () => {
      const result = eventSchema.parse({
        eventName: 'Conference',
        location: 'New York',
        accentColor: '#f97316',
      });
      expect(result.eventName).toBe('Conference');
      expect(result.location).toBe('New York');
    });
  });

  describe('launchSchema', () => {
    it('has default product name', () => {
      const result = launchSchema.parse({});
      expect(result.productName).toBe('My Product');
    });

    it('accepts valid launch params', () => {
      const result = launchSchema.parse({
        productName: 'New App',
        punchline: 'Amazing features',
        badge: 'Now live',
      });
      expect(result.productName).toBe('New App');
      expect(result.badge).toBe('Now live');
    });
  });
});
