import assert from 'node:assert/strict';
import test from 'node:test';

import {resolveInitialTemplateName} from './use-builder-state';

test('resolveInitialTemplateName prefers URL template over persisted current template', () => {
  const resolved = resolveInitialTemplateName('portfolio', {
    current: 'blog',
    templates: {},
  });

  assert.equal(resolved, 'portfolio');
});

test('resolveInitialTemplateName falls back to persisted template when URL template is missing', () => {
  const resolved = resolveInitialTemplateName(null, {
    current: 'launch',
    templates: {},
  });

  assert.equal(resolved, 'launch');
});
