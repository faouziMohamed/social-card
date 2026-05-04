import {describe, expect, it} from 'vitest';

import {
  availabilitySchema,
  labelSchema,
  progressSchema,
  scoreSchema,
  socialsSchema,
  statSchema,
  statusSchema,
  techStackSchema,
} from '@/modules/badge/shared/badge-schemas';

describe('Badge Schemas Validation', () => {
  describe('labelSchema', () => {
    it('applies default values', () => {
      const result = labelSchema.parse({});
      expect(result.label).toBe('version');
      expect(result.message).toBe('1.0.0');
      expect(result.theme).toBe('dark');
    });

    it('accepts custom values', () => {
      const result = labelSchema.parse({
        label: 'build',
        message: 'passing',
        color: '#22c55e',
      });
      expect(result.label).toBe('build');
      expect(result.message).toBe('passing');
    });

    it('validates hex colors', () => {
      expect(() => labelSchema.parse({color: '#ff0000'})).not.toThrow();
      expect(() => labelSchema.parse({color: 'red'})).toThrow();
    });
  });

  describe('statSchema', () => {
    it('applies default values', () => {
      const result = statSchema.parse({});
      expect(result.label).toBe('Stars');
      expect(result.value).toBe('1.2k');
    });

    it('accepts valid stat params', () => {
      const result = statSchema.parse({
        label: 'Downloads',
        value: '5.3k',
        unit: 'total',
        icon: 'download',
      });
      expect(result.label).toBe('Downloads');
      expect(result.icon).toBe('download');
    });
  });

  describe('statusSchema', () => {
    it('applies default values', () => {
      const result = statusSchema.parse({});
      expect(result.label).toBe('API');
      expect(result.status).toBe('online');
    });

    it('accepts valid status values', () => {
      for (const status of ['online', 'offline', 'degraded', 'maintenance']) {
        expect(() => statusSchema.parse({status})).not.toThrow();
      }
    });

    it('rejects invalid status values', () => {
      expect(() => statusSchema.parse({status: 'error'})).toThrow();
    });
  });

  describe('progressSchema', () => {
    it('applies default values', () => {
      const result = progressSchema.parse({});
      expect(result.label).toBe('Coverage');
      expect(result.value).toBe(75);
    });

    it('validates value range', () => {
      expect(() => progressSchema.parse({value: 50})).not.toThrow();
      expect(() => progressSchema.parse({value: 150})).toThrow();
    });
  });

  describe('scoreSchema', () => {
    it('applies default values', () => {
      const result = scoreSchema.parse({});
      expect(result.label).toBe('Performance');
      expect(result.value).toBe(95);
      expect(result.max).toBe(100);
    });

    it('accepts valid score params', () => {
      const result = scoreSchema.parse({
        value: 92,
        max: 100,
        label: 'Rating',
      });
      expect(result.value).toBe(92);
      expect(result.max).toBe(100);
    });
  });

  describe('socialsSchema', () => {
    it('applies default values', () => {
      const result = socialsSchema.parse({});
      expect(result.platform).toBe('github');
      expect(result.handle).toBe('acme');
    });

    it('accepts valid social params', () => {
      const result = socialsSchema.parse({
        platform: 'x',
        handle: 'elonmusk',
        followers: '180M',
      });
      expect(result.platform).toBe('x');
      expect(result.handle).toBe('elonmusk');
    });
  });

  describe('techStackSchema', () => {
    it('applies default values', () => {
      const result = techStackSchema.parse({});
      expect(result.stack).toBe('React,TypeScript,Go');
    });

    it('accepts tech stack list', () => {
      const result = techStackSchema.parse({
        stack: 'React,TypeScript,Node.js',
        style: 'tags',
      });
      expect(result.stack).toBe('React,TypeScript,Node.js');
    });
  });

  describe('availabilitySchema', () => {
    it('applies default values', () => {
      const result = availabilitySchema.parse({});
      expect(result.label).toBe('Mohamed Faouzi');
      expect(result.available).toBe('true');
    });

    it('accepts valid availability params', () => {
      const result = availabilitySchema.parse({
        label: 'John Doe',
        available: 'false',
        hireText: 'Not available',
      });
      expect(result.label).toBe('John Doe');
      expect(result.available).toBe('false');
    });
  });
});
