import {describe, expect, it} from 'vitest';

import {resolveInitialTemplateName} from '@/modules/og/client/hooks/use-builder-state';

describe('resolveInitialTemplateName', () => {
  it('prefers URL template over persisted current template', () => {
    const resolved = resolveInitialTemplateName('portfolio', {
      current: 'blog',
      templates: {},
    });

    expect(resolved).toBe('portfolio');
  });

  it('falls back to persisted template when URL template is missing', () => {
    const resolved = resolveInitialTemplateName(null, {
      current: 'launch',
      templates: {},
    });

    expect(resolved).toBe('launch');
  });
});
