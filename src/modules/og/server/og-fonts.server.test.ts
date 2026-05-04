import {describe, expect, it} from 'vitest';

import * as ogFonts from '@/modules/og/server/og-fonts.server';

const SAMPLE_GOOGLE_CSS = `
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/inter/v20/inter-regular.ttf) format('truetype');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/inter/v20/inter-bold.ttf) format('truetype');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/inter/v20/inter-regular.woff2) format('woff2');
}
`;

describe('og-fonts.server', () => {
  describe('parseGoogleFontCss', () => {
    it('parses supported Google font sources for the requested weights', () => {
      expect(typeof ogFonts.parseGoogleFontCss).toBe('function');

      const sources =
        ogFonts.parseGoogleFontCss?.(SAMPLE_GOOGLE_CSS, [400, 700]) ?? [];

      expect(sources).toEqual([
        {
          weight: 400,
          style: 'normal',
          url: 'https://fonts.gstatic.com/s/inter/v20/inter-regular.ttf',
          format: 'truetype',
        },
        {
          weight: 700,
          style: 'normal',
          url: 'https://fonts.gstatic.com/s/inter/v20/inter-bold.ttf',
          format: 'truetype',
        },
      ]);
    });
  });

  describe('resolveOgFontDefinition', () => {
    it('returns jetbrains mono fallback for unsupported fonts like commit-mono', () => {
      expect(typeof ogFonts.resolveOgFontDefinition).toBe('function');

      const definition = ogFonts.resolveOgFontDefinition?.('commit-mono');

      expect(definition?.source).toBe('google');
      expect(definition?.category).toBe('mono');
      expect(definition?.family).toBe('JetBrains Mono');
      expect(definition?.ligatures).toBe(true);
    });

    it('returns google source for supported fonts like inter', () => {
      const definition = ogFonts.resolveOgFontDefinition?.('inter');

      expect(definition?.source).toBe('google');
      expect(definition?.category).toBe('sans');
      expect(definition?.family).toBe('Inter');
    });
  });
});
