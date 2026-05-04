import type {SeoTemplateName} from './seo-schemas';

export type {
  FieldDef,
  FormSection,
} from '@/modules/og/shared/og-template-registry';

// ─── Template metadata ────────────────────────────────────────────────────────

export interface SeoTemplateMeta {
  name: SeoTemplateName;
  label: string;
  desc: string;
  color: string;
  icon: string;
}

export const TEMPLATE_META: SeoTemplateMeta[] = [
  {
    name: 'favicon',
    label: 'Favicon',
    desc: '32×32 browser tab icon',
    color: '#6366f1',
    icon: '⬡',
  },
  {
    name: 'apple-touch-icon',
    label: 'Apple Touch Icon',
    desc: '180×180 iOS home screen icon',
    color: '#3b82f6',
    icon: '◎',
  },
  {
    name: 'manifest-icon',
    label: 'Manifest Icon',
    desc: '192 or 512 px PWA icon',
    color: '#22d3ee',
    icon: '◉',
  },
  {
    name: 'twitter-card',
    label: 'Twitter Card',
    desc: '800×418 social preview card',
    color: '#14b8a6',
    icon: '▤',
  },
  {
    name: 'json-ld',
    label: 'JSON-LD',
    desc: 'Structured data script generator',
    color: '#f59e0b',
    icon: '⌘',
  },
  {
    name: 'robots-txt',
    label: 'Robots.txt',
    desc: 'Crawler policy helper',
    color: '#22c55e',
    icon: '⚙',
  },
  {
    name: 'meta-pack',
    label: 'Meta Pack',
    desc: 'Canonical + OG + Twitter tags',
    color: '#8b5cf6',
    icon: '✦',
  },
  {
    name: 'image-workflow',
    label: 'Image Workflow',
    desc: 'Generate all SEO image URLs from one source',
    color: '#f97316',
    icon: '◍',
  },
];

export {ICON_BASE_SECTIONS, SHARED_THEME} from './seo-shared-sections';
export {DEMO_PARAMS} from './seo-template-examples';
export {TEMPLATE_SECTIONS} from './seo-template-sections';
