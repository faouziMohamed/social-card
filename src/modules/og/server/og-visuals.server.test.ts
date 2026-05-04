import {describe, expect, it} from 'vitest';

import {
  composeBackgroundStyle,
  composeBackgroundStyleWithTone,
  parseBgStyleTokens,
  resolveTypographyStyle,
} from '@/modules/og/server/og-visuals.server';

describe('og-visuals.server — edge cases & bug discovery', () => {
  describe('parseBgStyleTokens — graceful defaults', () => {
    it('returns gradient default for empty string', () => {
      const result = parseBgStyleTokens('');
      expect(result.base).toBe('gradient');
      expect(result.overlays).toEqual([]);
    });

    it('returns gradient default for only +', () => {
      const result = parseBgStyleTokens('+');
      expect(result.base).toBe('gradient');
      expect(result.overlays).toEqual([]);
    });

    it('returns gradient default for whitespace', () => {
      const result = parseBgStyleTokens('   ');
      expect(result.base).toBe('gradient');
    });

    it('returns gradient default for unknown base token', () => {
      const result = parseBgStyleTokens('unknown');
      expect(result.base).toBe('gradient');
      expect(result.overlays).toEqual([]);
    });

    it('handles mixed case correctly', () => {
      const result = parseBgStyleTokens('Gradient+Grid');
      expect(result.base).toBe('gradient');
      expect(result.overlays).toContain('grid');
    });

    it('returns gradient default for non-base tokens', () => {
      const result = parseBgStyleTokens('grid+dots');
      expect(result.base).toBe('gradient');
      expect(result.overlays).toHaveLength(2);
    });
  });

  describe('composeBackgroundStyle — overlay edge cases', () => {
    it('handles empty bgStyle with gradient default', () => {
      const result = composeBackgroundStyle('', '#3b82f6', '#0f0f0f');
      expect(result.backgroundColor).toBe('#0f0f0f');
      expect(result.backgroundImage).toContain('linear-gradient');
    });

    it('combines all overlays without conflict', () => {
      const result = composeBackgroundStyle(
        'solid+grid+dots+diagonal+noise+spotlight+vignette',
        '#3b82f6',
        '#0f0f0f',
      );
      expect(result.backgroundImage).toContain('linear-gradient');
      expect(result.backgroundImage).toContain('radial-gradient');
      expect(result.backgroundSize).toContain('40px 40px');
    });

    it('uses fallback bg when invalid base', () => {
      const result = composeBackgroundStyle('invalid', '#3b82f6', '#0f0f0f');
      expect(result.backgroundColor).toBe('#0f0f0f');
    });
  });

  describe('composeBackgroundStyleWithTone — tone edge cases', () => {
    it('uses custom color when tone is custom', () => {
      const result = composeBackgroundStyleWithTone(
        'solid',
        '#3b82f6',
        '#0f0f0f',
        'custom',
        '#ff0000',
      );
      expect(result.backgroundColor).toBe('#ff0000');
    });

    it('falls back to fallbackBg when custom color missing', () => {
      const result = composeBackgroundStyleWithTone(
        'solid',
        '#3b82f6',
        '#0f0f0f',
        'custom',
      );
      expect(result.backgroundColor).toBe('#0f0f0f');
    });

    it('uses light tone colors', () => {
      const result = composeBackgroundStyleWithTone(
        'aurora',
        '#3b82f6',
        '#0f0f0f',
        'light',
      );
      expect(result.backgroundColor).toBe('#eef6ff');
    });

    it('uses dark tone by default', () => {
      const result = composeBackgroundStyleWithTone(
        'solid',
        '#3b82f6',
        '#0f0f0f',
        'dark',
      );
      expect(result.backgroundColor).toBe('#0f0f0f');
    });

    it('fgOpacityBase changes with tone', () => {
      const darkResult = composeBackgroundStyleWithTone(
        'solid+grid',
        '#3b82f6',
        '#0f0f0f',
        'dark',
      );
      const lightResult = composeBackgroundStyleWithTone(
        'solid+grid',
        '#3b82f6',
        '#0f0f0f',
        'light',
      );
      expect(darkResult.backgroundImage).toContain('0.09');
      expect(lightResult.backgroundImage).toContain('0.07');
    });
  });

  describe('resolveTypographyStyle — font handling', () => {
    it('returns family only for non-ligature fonts', () => {
      const result = resolveTypographyStyle('inter');
      expect(result).toEqual({fontFamily: 'Inter'});
    });

    it('returns ligature styles for fira-code', () => {
      const result = resolveTypographyStyle('fira-code');
      expect(result).toMatchObject({
        fontFamily: 'Fira Code',
        fontFeatureSettings: '"liga" 1, "calt" 1',
      });
    });

    it('handles geist (default font)', () => {
      const result = resolveTypographyStyle('geist');
      expect(result).toEqual({fontFamily: 'Geist'});
    });

    it('handles jetbrains mono (key: mono) with ligatures', () => {
      const result = resolveTypographyStyle('mono');
      expect(result.fontFamily).toBe('JetBrains Mono');
      if (result.fontFeatureSettings) {
        expect(result.fontFeatureSettings).toContain('"liga"');
      }
    });

    it('handles unknown font gracefully', () => {
      const result = resolveTypographyStyle('unknown-font');
      expect(result.fontFamily).toBeTruthy();
    });
  });

  describe('Integration: bgStyle + tone + typography', () => {
    it('composes full OG background with all features', () => {
      const bg = composeBackgroundStyleWithTone(
        'gradient+grid+vignette',
        '#3b82f6',
        '#0f0f0f',
        'dark',
        undefined,
        '#ff0000',
        '#00ff00',
      );
      const typo = resolveTypographyStyle('fira-code');

      expect(bg.backgroundImage).toContain('linear-gradient');
      expect(bg.backgroundImage).toContain('radial-gradient');
      expect(typo.fontFamily).toBe('Fira Code');
      expect(typo.fontFeatureSettings).toContain('"liga"');
    });
  });
});
