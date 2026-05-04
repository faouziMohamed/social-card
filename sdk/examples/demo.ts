/**
 * Social Card SDK — runnable demo
 *
 * Run with:
 *   pnpm example
 *   # or directly:
 *   npx tsx examples/demo.ts
 */

import {writeFileSync} from 'fs';

import {SocialCardClient} from '../src/index';

const BASE_URL = 'https://social-card.mfaouzi.com';

const client = new SocialCardClient({
  baseUrl: BASE_URL,
  defaultTheme: 'dark',
  defaultAccentColor: '#6366f1',
});

// ─── helpers ────────────────────────────────────────────────────────────────

function section(title: string) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  ${title}`);
  console.log('─'.repeat(60));
}

function row(label: string, value: string) {
  console.log(`  ${label.padEnd(20)} ${value}`);
}

// ─── OG Image URLs ──────────────────────────────────────────────────────────

section('OG Images — URL builder');

row(
  'general',
  client.og.general({
    title: 'Social Card SDK',
    description: 'Generate Open Graph images programmatically.',
    siteName: 'social-card',
    accentColor: '#6366f1',
  }),
);

row(
  'general (light)',
  client.og.general({
    title: 'Light Mode Card',
    theme: 'light',
    bgStyle: 'aurora+grid',
  }),
);

// ─── Badge URLs ─────────────────────────────────────────────────────────────

section('Badges — URL builder');

row(
  'label (version)',
  client.badge.label({label: 'version', message: '0.1.0', color: '#6366f1'}),
);

row(
  'label (build)',
  client.badge.label({label: 'build', message: 'passing', color: '#22c55e'}),
);

row(
  'label (coverage)',
  client.badge.label({label: 'coverage', message: '98%', color: '#f59e0b'}),
);

// ─── SEO Asset URLs ─────────────────────────────────────────────────────────

section('SEO Assets — URL builder');

row('favicon', client.seo.favicon({initial: 'OG', color: '#6366f1'}));
row('favicon (no params)', client.seo.favicon({}));

// ─── Live fetches + save to file ────────────────────────────────────────────

async function main() {
  section('Live fetch — badge SVG from API');

  try {
    console.log('  Fetching badge SVG…');
    const svg = await client.badge.labelSvg({
      label: 'sdk',
      message: 'live',
      color: '#6366f1',
    });
    const firstLine = svg.split('\n')[0] ?? '(empty response)';
    console.log(`  Status  OK`);
    console.log(`  Preview ${firstLine}`);
    console.log(`  Length  ${svg.length} chars`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`  Skipped (no network or server offline): ${message}`);
  }

  section('Save to file');

  // ── OG image → PNG ──────────────────────────────────────────────────────
  try {
    console.log('  Fetching OG image…');
    const arrayBuffer = await client.og.generalBuffer({
      title: 'Social Card SDK',
      description: 'Generate Open Graph images programmatically.',
      siteName: 'social-card',
    });
    const path = '/tmp/og-demo.png';
    writeFileSync(path, Buffer.from(arrayBuffer));
    console.log(`  ✓ OG image  →  ${path}  (${arrayBuffer.byteLength} bytes)`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`  Skipped OG image: ${message}`);
  }

  // ── Badge SVG → .svg ────────────────────────────────────────────────────
  try {
    console.log('  Fetching badge SVG…');
    const svg = await client.badge.labelSvg({
      label: 'social-card-sdk',
      message: '0.1.1',
      color: '#6366f1',
    });
    const path = '/tmp/badge-demo.svg';
    writeFileSync(path, svg, 'utf8');
    console.log(`  ✓ Badge SVG →  ${path}  (${svg.length} chars)`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`  Skipped badge SVG: ${message}`);
  }

  // ── Favicon → .ico ──────────────────────────────────────────────────────
  try {
    console.log('  Fetching favicon…');
    const arrayBuffer = await client.seo.faviconBuffer({
      initial: 'OG',
      color: '#6366f1',
    });
    const path = '/tmp/favicon-demo.ico';
    writeFileSync(path, Buffer.from(arrayBuffer));
    console.log(`  ✓ Favicon   →  ${path}  (${arrayBuffer.byteLength} bytes)`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`  Skipped favicon: ${message}`);
  }

  console.log('\n' + '─'.repeat(60) + '\n');
}

main();
