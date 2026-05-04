import {describe, expect, it} from 'vitest';
import {SocialCardClient} from '../client';
import {SeoModule} from './seo.module';

function makeClient(base = 'https://example.com') {
  return new SocialCardClient({baseUrl: base});
}

describe('SeoModule', () => {
  it('is instantiated on client.seo', () => {
    expect(makeClient().seo).toBeInstanceOf(SeoModule);
  });

  describe('favicon()', () => {
    it('returns URL for favicon endpoint', () => {
      const url = makeClient().seo.favicon({});
      expect(url).toContain('/api/seo/favicon');
    });

    it('includes optional initial param', () => {
      const url = makeClient().seo.favicon({initial: 'A'});
      expect(url).toContain('initial=A');
    });

    it('includes optional color param', () => {
      const url = makeClient().seo.favicon({color: '#6366f1'});
      expect(url).toContain('color=%236366f1');
    });

    it('includes base URL', () => {
      const url = makeClient('https://myhost.io').seo.favicon({});
      expect(url).toMatch(/^https:\/\/myhost\.io/);
    });
  });
});
