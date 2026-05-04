import {describe, expect, it} from 'vitest';
import {SocialCardClient} from '../client';
import {OgModule} from './og.module';

function makeClient(base = 'https://example.com') {
  return new SocialCardClient({baseUrl: base});
}

describe('OgModule', () => {
  it('is instantiated on client.og', () => {
    expect(makeClient().og).toBeInstanceOf(OgModule);
  });

  describe('general()', () => {
    it('returns URL for general template', () => {
      const url = makeClient().og.general({title: 'My Page'});
      expect(url).toContain('/api/og/general');
      expect(url).toContain('title=My+Page');
    });

    it('includes base URL', () => {
      const url = makeClient('https://custom.io').og.general({title: 'T'});
      expect(url).toMatch(/^https:\/\/custom\.io/);
    });

    it('passes optional params through', () => {
      const url = makeClient().og.general({
        title: 'Test',
        description: 'A description',
        siteName: 'MySite',
        accentColor: '#ff0000',
      });
      expect(url).toContain('description=A+description');
      expect(url).toContain('siteName=MySite');
      expect(url).toContain('accentColor=%23ff0000');
    });
  });
});
