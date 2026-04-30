import type {SeoTemplateName} from './seo-schemas';

export type {FieldDef, FormSection} from '@/modules/og/shared/og-template-registry';
import type {FormSection} from '@/modules/og/shared/og-template-registry';

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
];

// ─── Template sections ────────────────────────────────────────────────────────

const SHARED_THEME: FormSection = {
  title: 'Theme',
  fields: [
    {key: 'theme', label: 'Theme', type: 'select', options: ['dark', 'light']},
  ],
};

const ICON_BASE_SECTIONS: FormSection[] = [
  {
    title: 'Identity',
    fields: [
      {key: 'initial', label: 'Monogram', type: 'text', placeholder: 'A'},
      {key: 'logo', label: 'Logo URL', type: 'url', placeholder: 'https://…'},
    ],
  },
  {
    title: 'Style',
    fields: [
      {key: 'color', label: 'Background', type: 'color'},
      {key: 'accentColor', label: 'Accent', type: 'color'},
      {key: 'shape', label: 'Shape', type: 'select', options: ['circle', 'square', 'rounded']},
    ],
  },
  SHARED_THEME,
];

export const TEMPLATE_SECTIONS: Record<SeoTemplateName, FormSection[]> = {
  favicon: ICON_BASE_SECTIONS,
  'apple-touch-icon': ICON_BASE_SECTIONS,
  'manifest-icon': [
    {
      title: 'Identity',
      fields: [
        {key: 'initial', label: 'Monogram', type: 'text', placeholder: 'A'},
        {key: 'logo', label: 'Logo URL', type: 'url', placeholder: 'https://…'},
      ],
    },
    {
      title: 'Style',
      fields: [
        {key: 'color', label: 'Background', type: 'color'},
        {key: 'accentColor', label: 'Accent', type: 'color'},
        {key: 'shape', label: 'Shape', type: 'select', options: ['circle', 'square', 'rounded']},
        {key: 'size', label: 'Size', type: 'select', options: ['192', '512']},
      ],
    },
    SHARED_THEME,
  ],
  'twitter-card': [
    {
      title: 'Content',
      fields: [
        {key: 'title', label: 'Title', type: 'text', placeholder: 'Title'},
        {key: 'description', label: 'Description', type: 'text', placeholder: 'Short description'},
        {key: 'siteName', label: 'Site name', type: 'text', placeholder: 'My Site'},
        {key: 'logo', label: 'Logo URL', type: 'url', placeholder: 'https://…'},
      ],
    },
    {
      title: 'Style',
      fields: [
        {key: 'accentColor', label: 'Accent', type: 'color'},
        {key: 'bgStyle', label: 'BG style', type: 'text', placeholder: 'gradient+grid'},
      ],
    },
    SHARED_THEME,
  ],
};

// ─── Demo params ──────────────────────────────────────────────────────────────

export const DEMO_PARAMS: {template: SeoTemplateName; params: string}[] = [
  {
    template: 'favicon',
    params: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded&theme=dark',
  },
  {
    template: 'apple-touch-icon',
    params: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded&theme=dark',
  },
  {
    template: 'manifest-icon',
    params: 'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded&size=512&theme=dark',
  },
  {
    template: 'twitter-card',
    params: 'title=Open+Graph+Generator&description=Self-hostable+social+card+generator&siteName=og-graph&accentColor=%236366f1&bgStyle=gradient%2Bgrid&theme=dark',
  },
];
