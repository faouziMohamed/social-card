import {describe, expect, it} from 'vitest';

import {
  clampStyle,
  getContrastColor,
  hexToRgba,
  resolveCacheControl,
} from '@/modules/og/server/og-render.server';

describe('og-render.server', () => {
  describe('resolveCacheControl', () => {
    it('returns public cache for normal requests', () => {
      expect(resolveCacheControl({})).toBe(
        'public, max-age=86400, stale-while-revalidate=604800',
      );
    });

    it('returns no-cache when bust param present with any value', () => {
      expect(resolveCacheControl({bust: '1'})).toBe(
        'no-store, no-cache, must-revalidate, proxy-revalidate',
      );
    });

    it('returns no-cache when bust is empty string', () => {
      expect(resolveCacheControl({bust: ''})).toBe(
        'no-store, no-cache, must-revalidate, proxy-revalidate',
      );
    });

    it('is case-sensitive — BUST is not recognized', () => {
      expect(resolveCacheControl({BUST: '1'})).toBe(
        'public, max-age=86400, stale-while-revalidate=604800',
      );
    });

    it('detects bust among other params', () => {
      expect(
        resolveCacheControl({title: 'Hi', bust: 'true', theme: 'dark'}),
      ).toBe('no-store, no-cache, must-revalidate, proxy-revalidate');
    });
  });

  describe('clampStyle', () => {
    it('returns correct webkit line-clamp styles', () => {
      expect(clampStyle(3)).toEqual({
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      });
    });

    it('handles 0 lines (edge case)', () => {
      const result = clampStyle(0);
      expect(result.WebkitLineClamp).toBe(0);
    });

    it('handles large line counts', () => {
      const result = clampStyle(100);
      expect(result.WebkitLineClamp).toBe(100);
    });
  });

  describe('hexToRgba — valid inputs', () => {
    it('converts 6-digit hex with #', () => {
      expect(hexToRgba('#ff0000', 0.5)).toBe('rgba(255,0,0,0.5)');
    });

    it('converts 3-digit hex with #', () => {
      expect(hexToRgba('#f00', 1)).toBe('rgba(255,0,0,1)');
    });

    it('converts 6-digit hex lowercase', () => {
      expect(hexToRgba('#00ff00', 0.25)).toBe('rgba(0,255,0,0.25)');
    });

    it('converts 6-digit hex uppercase', () => {
      expect(hexToRgba('#0000FF', 0.75)).toBe('rgba(0,0,255,0.75)');
    });

    it('handles mixed case hex', () => {
      expect(hexToRgba('#AaBbCc', 0.5)).toBe('rgba(170,187,204,0.5)');
    });

    it('handles input without # prefix (strips # then validates)', () => {
      expect(hexToRgba('ff0000', 1)).toBe('rgba(255,0,0,1)');
    });
  });

  describe('hexToRgba — strict validation (must throw on invalid)', () => {
    it('throws on 4-digit hex', () => {
      expect(() => hexToRgba('#1234', 1)).toThrow('Invalid hex color');
    });

    it('throws on 5-digit hex', () => {
      expect(() => hexToRgba('#12345', 1)).toThrow('Invalid hex color');
    });

    it('throws on 7+ digit hex', () => {
      expect(() => hexToRgba('#1234567', 1)).toThrow('Invalid hex color');
    });

    it('throws on non-hex characters', () => {
      expect(() => hexToRgba('#gggggg', 1)).toThrow('Invalid hex color');
    });

    it('throws on empty string after #', () => {
      expect(() => hexToRgba('#', 1)).toThrow('Invalid hex color');
    });

    it('throws on just #', () => {
      expect(() => hexToRgba('#', 1)).toThrow('Invalid hex color');
    });

    it('throws on empty string', () => {
      expect(() => hexToRgba('', 1)).toThrow('Invalid hex color');
    });
  });

  describe('hexToRgba — alpha edge cases', () => {
    it('handles alpha > 1 (invalid CSS but not caught)', () => {
      const result = hexToRgba('#ff0000', 2);
      expect(result).toBe('rgba(255,0,0,2)'); // Invalid CSS but function doesn't validate
    });

    it('handles negative alpha (invalid CSS but not caught)', () => {
      const result = hexToRgba('#ff0000', -0.5);
      expect(result).toBe('rgba(255,0,0,-0.5)'); // Invalid CSS
    });

    it('handles alpha = 0', () => {
      expect(hexToRgba('#ff0000', 0)).toBe('rgba(255,0,0,0)');
    });

    it('handles decimal alpha like 0.123456 (precision)', () => {
      expect(hexToRgba('#ff0000', 0.123_456)).toBe('rgba(255,0,0,0.123456)');
    });
  });

  describe('getContrastColor — valid inputs', () => {
    it('returns white for pure black', () => {
      expect(getContrastColor('#000000')).toBe('#ffffff');
    });

    it('returns dark for pure white', () => {
      expect(getContrastColor('#ffffff')).toBe('#111111');
    });

    it('returns white for dark gray', () => {
      expect(getContrastColor('#333333')).toBe('#ffffff');
    });

    it('returns dark for light gray', () => {
      expect(getContrastColor('#cccccc')).toBe('#111111');
    });

    it('handles 3-digit shorthand', () => {
      expect(getContrastColor('#000')).toBe('#ffffff');
      expect(getContrastColor('#fff')).toBe('#111111');
    });

    it('handles input without # prefix', () => {
      expect(getContrastColor('000000')).toBe('#ffffff');
    });
  });

  describe('getContrastColor — strict validation (must throw on invalid)', () => {
    it('throws on invalid hex characters', () => {
      expect(() => getContrastColor('#gggggg')).toThrow('Invalid hex color');
    });

    it('throws on empty hex after #', () => {
      expect(() => getContrastColor('#')).toThrow('Invalid hex color');
    });

    it('throws on 4-digit hex', () => {
      expect(() => getContrastColor('#1234')).toThrow('Invalid hex color');
    });

    it('throws on 5-digit hex', () => {
      expect(() => getContrastColor('#12345')).toThrow('Invalid hex color');
    });

    it('throws on empty string', () => {
      expect(() => getContrastColor('')).toThrow('Invalid hex color');
    });

    it('threshold boundary: L > 0.35 returns dark (not >=)', () => {
      // #888888 has L ≈ 0.35 — should return white, not dark
      const result = getContrastColor('#888888');
      expect(result).toBe('#ffffff'); // strict > not >=
    });
  });

  describe('Integration: strict validation consistency', () => {
    const invalidInputs = ['#g', '#1234', '#12345', '#', '', 'gggggg'];
    const validInputs = ['#ff0000', '#f00', '#00ff00', '#0000ff', 'ff0000'];

    for (const input of invalidInputs) {
      it(`throws on invalid input: ${input}`, () => {
        expect(() => hexToRgba(input, 1)).toThrow('Invalid hex color');
        expect(() => getContrastColor(input)).toThrow('Invalid hex color');
      });
    }

    for (const input of validInputs) {
      it(`accepts valid input: ${input}`, () => {
        expect(() => hexToRgba(input, 0.5)).not.toThrow();
        expect(() => getContrastColor(input)).not.toThrow();
      });
    }
  });
});
