import type {FormSection} from '@/modules/og/shared/og-template-registry';
import type {SeoTemplateName} from '@/modules/seo/shared/seo-schemas';
import {SHARED_THEME} from '@/modules/seo/shared/seo-shared-sections';

export const TEXT_TEMPLATE_SECTIONS: Record<
  Extract<
    SeoTemplateName,
    'twitter-card' | 'robots-txt' | 'meta-pack' | 'image-workflow'
  >,
  FormSection[]
> = {
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
        {
          key: 'theme',
          label: 'Theme',
          type: 'select',
          options: ['dark', 'light'],
        },
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
