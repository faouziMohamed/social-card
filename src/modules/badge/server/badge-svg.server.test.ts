import {describe, expect, it} from 'vitest';

import {
  circle,
  clipPath,
  escapeXml,
  estimateTextWidth,
  icon,
  line,
  monoText,
  rect,
  svgRoot,
  text,
} from '@/modules/badge/server/badge-svg.server';

describe('badge-svg.server', () => {
  describe('svgRoot', () => {
    it('creates basic SVG wrapper', () => {
      const result = svgRoot(100, 50, '<rect/>');
      expect(result).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
      expect(result).toContain('width="100"');
      expect(result).toContain('height="50"');
      expect(result).toContain('<rect/>');
      expect(result).toContain('</svg>');
    });

    it('includes defs when provided', () => {
      const result = svgRoot(100, 50, '<rect/>', '<clipPath/>');
      expect(result).toContain('<defs><clipPath/></defs>');
    });

    it('handles empty defs', () => {
      const result = svgRoot(100, 50, '<rect/>', '');
      expect(result).not.toContain('<defs>');
    });
  });

  describe('rect', () => {
    it('creates rectangle element', () => {
      const result = rect(0, 0, 100, 50, '#ff0000');
      expect(result).toContain('x="0"');
      expect(result).toContain('y="0"');
      expect(result).toContain('width="100"');
      expect(result).toContain('height="50"');
      expect(result).toContain('fill="#ff0000"');
      expect(result).toContain('rx="4"');
    });

    it('applies custom rx', () => {
      const result = rect(0, 0, 100, 50, '#ff0000', 8);
      expect(result).toContain('rx="8"');
    });

    it('includes extra attributes', () => {
      const result = rect(
        0,
        0,
        100,
        50,
        '#ff0000',
        4,
        'clip-path="url(#clip)"',
      );
      expect(result).toContain('clip-path="url(#clip)"');
    });
  });

  describe('clipPath', () => {
    it('creates clipPath element', () => {
      const result = clipPath('myClip', 100, 50);
      expect(result).toContain('<clipPath id="myClip"');
      expect(result).toContain('width="100"');
      expect(result).toContain('height="50"');
    });

    it('applies custom rx', () => {
      const result = clipPath('myClip', 100, 50, 8);
      expect(result).toContain('rx="8"');
    });
  });

  describe('text', () => {
    it('creates text element with defaults', () => {
      const result = text('Hello', 10, 20, '#000000');
      expect(result).toContain('<text');
      expect(result).toContain('>Hello</text>');
      expect(result).toContain('x="10"');
      expect(result).toContain('y="20"');
      expect(result).toContain('fill="#000000"');
    });

    it('applies custom font settings', () => {
      const result = text('Hello', 10, 20, '#000000', 14, 'bold', 'middle');
      expect(result).toContain('font-size="14"');
      expect(result).toContain('font-weight="bold"');
      expect(result).toContain('text-anchor="middle"');
    });
  });

  describe('monoText', () => {
    it('creates monospace text', () => {
      const result = monoText('123', 10, 20, '#000000');
      expect(result).toContain('123');
      expect(result).toContain("'JetBrains Mono'");
      expect(result).toContain("'Cascadia Code'");
      expect(result).toContain('monospace');
    });
  });

  describe('circle', () => {
    it('creates circle element', () => {
      const result = circle(50, 50, 10, '#ff0000');
      expect(result).toContain('cx="50"');
      expect(result).toContain('cy="50"');
      expect(result).toContain('r="10"');
      expect(result).toContain('fill="#ff0000"');
    });
  });

  describe('line', () => {
    it('creates line element', () => {
      const result = line(0, 10, 100, 10, '#cccccc');
      expect(result).toContain('x1="0"');
      expect(result).toContain('y1="10"');
      expect(result).toContain('x2="100"');
      expect(result).toContain('stroke="#cccccc"');
    });

    it('applies stroke width', () => {
      const result = line(0, 10, 100, 10, '#cccccc', 2);
      expect(result).toContain('stroke-width="2"');
    });
  });

  describe('estimateTextWidth', () => {
    it('estimates width for short text', () => {
      const width = estimateTextWidth('Hi', 11);
      expect(width).toBeGreaterThan(0);
      expect(width).toBeLessThan(100);
    });

    it('estimates width scales with font size', () => {
      const width11 = estimateTextWidth('Hello', 11);
      const width20 = estimateTextWidth('Hello', 20);
      expect(width20).toBeGreaterThan(width11);
    });

    it('handles empty string', () => {
      expect(estimateTextWidth('', 11)).toBe(0);
    });
  });

  describe('escapeXml', () => {
    it('escapes ampersand', () => {
      expect(escapeXml('A&B')).toBe('A&amp;B');
    });

    it('escapes less than and greater than', () => {
      expect(escapeXml('<tag>')).toBe('&lt;tag&gt;');
    });

    it('escapes quotes', () => {
      expect(escapeXml('"quoted"')).toBe('&quot;quoted&quot;');
    });

    it('handles text without special characters', () => {
      expect(escapeXml('Hello World')).toBe('Hello World');
    });
  });

  describe('icon', () => {
    it('renders icon SVG for known icon', () => {
      const result = icon('star', 12, 12, 16);
      expect(result).toContain('<g transform');
      expect(result).toContain('path');
    });

    it('returns empty string for unknown icon', () => {
      const result = icon('unknown', 12, 12, 16);
      expect(result).toBe('');
    });

    it('applies custom colors', () => {
      const result = icon('star', 12, 12, 16, '#ff0000', '#ffffff');
      expect(result).toContain('fill="#ff0000"');
      expect(result).toContain('stroke="#ffffff"');
    });
  });
});
