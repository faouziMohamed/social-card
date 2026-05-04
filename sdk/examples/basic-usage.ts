// Example: Using Social Card SDK in a TypeScript project
// Run: npx tsx examples/basic-usage.ts

import { writeFileSync } from 'fs';

import {SocialCardClient} from 'social-card-sdk';

// Initialize the client (defaults to https://social-card.mfaouzi.com)
const client = new SocialCardClient({
  baseUrl: 'https://social-card.mfaouzi.com',
  defaultTheme: 'dark',
  defaultAccentColor: '#6366f1',
});

// ===== OG Images =====

// Build a URL — no network call, instant
const ogUrl = client.og.general({
  title: 'My Awesome Page',
  description: 'Built with Social Card SDK',
  siteName: 'My Site',
  accentColor: '#8b5cf6',
});

console.log('OG Image URL:', ogUrl);

// ===== Badges =====

// Build a badge URL
const badgeUrl = client.badge.label({
  label: 'version',
  message: '1.0.0',
  color: '#6366f1',
});

console.log('Badge URL:', badgeUrl);

// ===== SEO Assets =====

// Build a favicon URL
const faviconUrl = client.seo.favicon({
  initial: 'OG',
  color: '#6366f1',
});

console.log('Favicon URL:', faviconUrl);

// ===== Live fetches (requires network) =====

async function main() {
  // Fetch OG image as ArrayBuffer and save to disk
  const ogBuffer = await client.og.generalBuffer({
    title: 'My Page',
    description: 'Check this out!',
  });
  writeFileSync('og-image.png', Buffer.from(ogBuffer));
  console.log('OG image saved → og-image.png');

  // Fetch badge SVG as a string
  const badgeSvg = await client.badge.labelSvg({
    label: 'build',
    message: 'passing',
    color: '#22c55e',
  });
  console.log('Badge SVG (first 80 chars):', badgeSvg.slice(0, 80));

  // Fetch favicon as ArrayBuffer and save
  const faviconBuffer = await client.seo.faviconBuffer({
    initial: 'OG',
    color: '#6366f1',
  });
  writeFileSync('favicon.ico', Buffer.from(faviconBuffer));
  console.log('Favicon saved → favicon.ico');
}

main().catch(console.error);
