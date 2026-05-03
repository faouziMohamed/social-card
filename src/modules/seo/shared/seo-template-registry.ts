import type {FormSection} from '@/modules/og/shared/og-template-registry';
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
      {
        key: 'shape',
        label: 'Shape',
        type: 'select',
        options: ['circle', 'square', 'rounded'],
      },
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
        {
          key: 'shape',
          label: 'Shape',
          type: 'select',
          options: ['circle', 'square', 'rounded'],
        },
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
        {
          key: 'description',
          label: 'Description',
          type: 'text',
          placeholder: 'Short description',
        },
        {
          key: 'siteName',
          label: 'Site name',
          type: 'text',
          placeholder: 'My Site',
        },
        {key: 'logo', label: 'Logo URL', type: 'url', placeholder: 'https://…'},
      ],
    },
    {
      title: 'Style',
      fields: [
        {key: 'accentColor', label: 'Accent', type: 'color'},
        {
          key: 'bgStyle',
          label: 'BG style',
          type: 'text',
          placeholder: 'gradient+grid',
        },
      ],
    },
    SHARED_THEME,
  ],
  'json-ld': [
    {
      title: 'Preset',
      fields: [
        {
          key: 'schemaType',
          label: 'Schema type',
          type: 'text',
          placeholder: 'Article, Product, FAQPage, Event, JobPosting…',
          options: [
            'Article',
            'Product',
            'FAQPage',
            'Organization',
            'LocalBusiness',
            'SoftwareApplication',
          ],
        },
      ],
    },
    {
      title: 'Core',
      fields: [
        {
          key: 'name',
          label: 'Name',
          type: 'text',
          placeholder: 'OG Graph',
        },
        {
          key: 'headline',
          label: 'Headline',
          type: 'text',
          placeholder: 'How to scale your metadata pipeline',
        },
        {
          key: 'description',
          label: 'Description',
          type: 'text',
          placeholder: 'Short summary',
        },
        {
          key: 'url',
          label: 'Canonical URL',
          type: 'url',
          placeholder: 'https://example.com/blog/post',
        },
        {
          key: 'image',
          label: 'Image URL',
          type: 'url',
          placeholder: 'https://example.com/og.png',
        },
      ],
    },
    {
      title: 'People and Publishing',
      fields: [
        {
          key: 'authorName',
          label: 'Author',
          type: 'text',
          placeholder: 'Jane Doe',
        },
        {
          key: 'publisherName',
          label: 'Publisher',
          type: 'text',
          placeholder: 'Acme Inc',
        },
        {key: 'datePublished', label: 'Published', type: 'date'},
        {key: 'dateModified', label: 'Modified', type: 'date'},
      ],
    },
    {
      title: 'Social Profiles',
      fields: [
        {
          key: 'sameAs1',
          label: 'Social URL 1',
          type: 'url',
          placeholder: 'https://x.com/your-brand',
        },
        {
          key: 'sameAs2',
          label: 'Social URL 2',
          type: 'url',
          placeholder: 'https://www.linkedin.com/company/your-brand',
        },
        {
          key: 'sameAs3',
          label: 'Social URL 3',
          type: 'url',
          placeholder: 'https://github.com/your-org',
        },
      ],
    },
    {
      title: 'Commerce and App',
      fields: [
        {
          key: 'price',
          label: 'Price',
          type: 'text',
          placeholder: '49.00',
        },
        {
          key: 'priceCurrency',
          label: 'Currency',
          type: 'text',
          placeholder: 'USD',
        },
        {
          key: 'applicationCategory',
          label: 'App category',
          type: 'text',
          placeholder: 'DeveloperApplication',
        },
        {
          key: 'operatingSystem',
          label: 'Operating system',
          type: 'text',
          placeholder: 'Web',
        },
      ],
    },
    {
      title: 'FAQ',
      fields: [
        {
          key: 'faqQuestion1',
          label: 'Question 1',
          type: 'text',
          placeholder: 'What does this tool do?',
        },
        {
          key: 'faqAnswer1',
          label: 'Answer 1',
          type: 'text',
          placeholder: 'It helps generate OG images and SEO assets.',
        },
        {
          key: 'faqQuestion2',
          label: 'Question 2',
          type: 'text',
          placeholder: 'Can I self-host this?',
        },
        {
          key: 'faqAnswer2',
          label: 'Answer 2',
          type: 'text',
          placeholder: 'Yes, deploy it on your own infrastructure.',
        },
      ],
    },
  ],
  'robots-txt': [
    {
      title: 'Crawler Rules',
      fields: [
        {key: 'userAgent', label: 'User-agent', type: 'text', placeholder: '*'},
        {key: 'allow', label: 'Allow', type: 'text', placeholder: '/'},
        {
          key: 'disallow',
          label: 'Disallow',
          type: 'text',
          placeholder: '/admin',
        },
        {
          key: 'crawlDelay',
          label: 'Crawl delay',
          type: 'text',
          placeholder: '10',
        },
      ],
    },
    {
      title: 'Sitemap and AI crawlers',
      fields: [
        {
          key: 'sitemap',
          label: 'Sitemap URL',
          type: 'url',
          placeholder: 'https://example.com/sitemap.xml',
        },
        {
          key: 'aiCrawlerPolicy',
          label: 'AI crawler policy',
          type: 'select',
          options: ['allow', 'disallow'],
        },
      ],
    },
  ],
  'meta-pack': [
    {
      title: 'Core Meta',
      fields: [
        {
          key: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'OG Graph',
        },
        {
          key: 'description',
          label: 'Description',
          type: 'text',
          placeholder: 'Generate OG images and SEO assets',
        },
        {
          key: 'canonical',
          label: 'Canonical URL',
          type: 'url',
          placeholder: 'https://example.com',
        },
        {
          key: 'robots',
          label: 'Robots',
          type: 'text',
          placeholder: 'index,follow,max-image-preview:large',
        },
      ],
    },
    {
      title: 'Open Graph',
      fields: [
        {
          key: 'ogType',
          label: 'OG type',
          type: 'text',
          placeholder: 'website',
        },
        {
          key: 'siteName',
          label: 'Site name',
          type: 'text',
          placeholder: 'OG Graph',
        },
        {
          key: 'locale',
          label: 'Locale',
          type: 'text',
          placeholder: 'en_US',
        },
        {
          key: 'ogImage',
          label: 'OG image URL',
          type: 'url',
          placeholder: 'https://example.com/og.png',
        },
      ],
    },
    {
      title: 'Twitter and extras',
      fields: [
        {
          key: 'twitterCard',
          label: 'Twitter card',
          type: 'select',
          options: ['summary_large_image', 'summary'],
        },
        {
          key: 'twitterSite',
          label: 'Twitter handle',
          type: 'text',
          placeholder: '@og_graph',
        },
        {key: 'themeColor', label: 'Theme color', type: 'color'},
        {
          key: 'keywords',
          label: 'Keywords',
          type: 'text',
          placeholder: 'og image,seo,open graph',
        },
      ],
    },
  ],
  'image-workflow': [
    {
      title: 'Source Image',
      fields: [
        {
          key: 'sourceImage',
          label: 'Source image URL',
          type: 'url',
          placeholder: 'https://example.com/brand-image.png',
        },
        {
          key: 'siteName',
          label: 'Site name',
          type: 'text',
          placeholder: 'My Site',
        },
      ],
    },
    {
      title: 'Card Content',
      fields: [
        {
          key: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Open Graph Generator',
        },
        {
          key: 'description',
          label: 'Description',
          type: 'text',
          placeholder: 'Generate OG images and SEO assets',
        },
      ],
    },
    {
      title: 'Card Style',
      fields: [
        {key: 'accentColor', label: 'Accent', type: 'color'},
        {key: 'theme', label: 'Theme', type: 'select', options: ['dark', 'light']},
        {
          key: 'bgStyle',
          label: 'BG style',
          type: 'text',
          placeholder: 'gradient+grid',
        },
      ],
    },
  ],
};

// ─── Demo params ──────────────────────────────────────────────────────────────

export const DEMO_PARAMS: {template: SeoTemplateName; params: string}[] = [
  {
    template: 'favicon',
    params:
      'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded&theme=dark',
  },
  {
    template: 'apple-touch-icon',
    params:
      'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded&theme=dark',
  },
  {
    template: 'manifest-icon',
    params:
      'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded&size=512&theme=dark',
  },
  {
    template: 'twitter-card',
    params:
      'title=Open+Graph+Generator&description=Self-hostable+social+card+generator&siteName=og-graph&accentColor=%236366f1&bgStyle=gradient%2Bgrid&theme=dark',
  },
  {
    template: 'json-ld',
    params:
      'schemaType=SoftwareApplication&name=OG+Graph&description=Generate+OG+images%2C+badges%2C+and+SEO+assets&url=https%3A%2F%2Fog-graph.dev&applicationCategory=DeveloperApplication&operatingSystem=Web',
  },
  {
    template: 'robots-txt',
    params:
      'userAgent=*&allow=%2F&disallow=%2Fprivate&sitemap=https%3A%2F%2Fexample.com%2Fsitemap.xml&aiCrawlerPolicy=allow',
  },
  {
    template: 'meta-pack',
    params:
      'title=OG+Graph&description=Generate+OG+images+and+SEO+assets&canonical=https%3A%2F%2Fexample.com&robots=index%2Cfollow%2Cmax-image-preview%3Alarge&ogType=website&ogImage=https%3A%2F%2Fexample.com%2Fog.png&twitterCard=summary_large_image',
  },
  {
    template: 'image-workflow',
    params:
      'sourceImage=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1518770660439-4636190af475&siteName=OG+Graph&title=Open+Graph+Generator&description=Generate+SEO+image+variants+from+one+input&accentColor=%236366f1&theme=dark&bgStyle=gradient%2Bgrid',
  },
];
