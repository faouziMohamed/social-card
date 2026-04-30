import assert from 'node:assert/strict';
import test from 'node:test';

import * as ogVisuals from './og-visuals.server';

test('enables ligatures for supported code fonts on a best-effort basis', () => {
  assert.equal(typeof ogVisuals.resolveTypographyStyle, 'function');

  assert.deepEqual(ogVisuals.resolveTypographyStyle?.('fira-code'), {
    fontFamily: 'Fira Code',
    fontFeatureSettings: '"liga" 1, "calt" 1',
    fontVariantLigatures: 'common-ligatures contextual',
  });

  assert.deepEqual(ogVisuals.resolveTypographyStyle?.('inter'), {
    fontFamily: 'Inter',
  });
});
