import {describe, expect, it} from 'vitest';

import {resolveTheme, themes} from '@/modules/og/server/og-themes.server';

describe('og-themes.server', () => {
  describe('resolveTheme', () => {
    it('returns dark theme for "dark"', () => {
      expect(resolveTheme('dark')).toEqual(themes.dark);
    });

    it('returns light theme for "light"', () => {
      expect(resolveTheme('light')).toEqual(themes.light);
    });

    it('resolves "auto" to dark theme on server', () => {
      expect(resolveTheme('auto')).toEqual(themes.dark);
    });
  });

  describe('themes object', () => {
    it('has dark theme with expected properties', () => {
      expect(themes.dark).toMatchObject({
        bg: '#0f0f0f',
        text: '#ffffff',
        textMuted: '#a1a1aa',
      });
    });

    it('has light theme with expected properties', () => {
      expect(themes.light).toMatchObject({
        bg: '#ffffff',
        text: '#09090b',
        textMuted: '#52525b',
      });
    });

    it('both themes have all required properties', () => {
      const requiredProps = [
        'bg',
        'bgSecondary',
        'text',
        'textMuted',
        'border',
        'tagBg',
        'tagText',
      ];

      for (const theme of [themes.dark, themes.light]) {
        for (const prop of requiredProps) {
          expect(theme).toHaveProperty(prop);
        }
      }
    });
  });
});
