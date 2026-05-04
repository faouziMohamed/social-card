import {describe, expect, it} from 'vitest';
import {SocialCardClient} from '../client';
import {BadgeModule} from './badge.module';

function makeClient(base = 'https://example.com') {
  return new SocialCardClient({baseUrl: base});
}

describe('BadgeModule', () => {
  it('is instantiated on client.badge', () => {
    expect(makeClient().badge).toBeInstanceOf(BadgeModule);
  });

  describe('label()', () => {
    it('returns URL for label badge', () => {
      const url = makeClient().badge.label({
        label: 'version',
        message: '1.0.0',
      });
      expect(url).toContain('/api/badge/label');
      expect(url).toContain('label=version');
      expect(url).toContain('message=1.0.0');
    });

    it('includes optional color param', () => {
      const url = makeClient().badge.label({
        label: 'build',
        message: 'passing',
        color: '#22c55e',
      });
      expect(url).toContain('color=%2322c55e');
    });

    it('includes base URL', () => {
      const url = makeClient('https://myhost.io').badge.label({
        label: 'x',
        message: 'y',
      });
      expect(url).toMatch(/^https:\/\/myhost\.io/);
    });
  });
});
