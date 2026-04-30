import assert from 'node:assert/strict';
import test from 'node:test';

import * as ogFonts from './og-fonts.server';

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

test('parses supported Google font sources for the requested weights', () => {
  assert.equal(typeof ogFonts.parseGoogleFontCss, 'function');

  const sources = ogFonts.parseGoogleFontCss?.(SAMPLE_GOOGLE_CSS, [400, 700]) ?? [];

  assert.deepEqual(sources, [
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

test('keeps local-only ligature monos in the catalog', () => {
  assert.equal(typeof ogFonts.resolveOgFontDefinition, 'function');

  const definition = ogFonts.resolveOgFontDefinition?.('commit-mono');

  assert.deepEqual(
    definition && {
      source: definition.source,
      category: definition.category,
      family: definition.family,
      ligatures: definition.ligatures,
    },
    {
      source: 'local',
      category: 'mono',
      family: 'Commit Mono',
      ligatures: true,
    },
  );
});
