import {
  SHARED_MEDIA,
  SHARED_STYLE,
} from '@/modules/og/shared/og-shared-sections';
import type {FormSection} from '@/modules/og/shared/og-template-registry';
import type {TemplateName} from '@/modules/og/shared/og.types';

export const TEMPLATE_SECTIONS_B: Partial<
  Partial<Record<TemplateName, FormSection[]>>
> = {
  product: [
    {
      title: 'Product',
      fields: [
        {
          key: 'productName',
          label: 'Name',
          type: 'text',
          placeholder: 'My Product',
        },
        {
          key: 'tagline',
          label: 'Tagline',
          type: 'text',
          placeholder: 'One-liner value prop',
        },
        {key: 'badge', label: 'Badge', type: 'text', placeholder: 'v2 Live'},
        {
          key: 'cta',
          label: 'CTA',
          type: 'text',
          placeholder: 'Get Started Free',
        },
      ],
    },
    {
      title: 'Features',
      fields: [
        {
          key: 'feature1',
          label: 'Feature 1',
          type: 'text',
          placeholder: 'Fast & reliable',
        },
        {
          key: 'feature2',
          label: 'Feature 2',
          type: 'text',
          placeholder: 'Open source',
        },
        {
          key: 'feature3',
          label: 'Feature 3',
          type: 'text',
          placeholder: 'Zero config',
        },
      ],
    },
    {
      title: 'Style',
      fields: [
        {key: 'accentColor', label: 'Accent', type: 'color'},
        {
          key: 'screenshot',
          label: 'Screenshot',
          type: 'url',
          placeholder: 'https://…',
        },
      ],
    },
    SHARED_STYLE,
  ],
  portfolio: [
    {
      title: 'Identity',
      fields: [
        {
          key: 'name',
          label: 'Full name',
          type: 'text',
          placeholder: 'Jane Doe',
        },
        {
          key: 'role',
          label: 'Role',
          type: 'text',
          placeholder: 'Full-Stack Developer',
        },
        {
          key: 'bio',
          label: 'Bio',
          type: 'text',
          placeholder: 'Building cool stuff',
        },
        {
          key: 'location',
          label: 'Location',
          type: 'text',
          placeholder: 'San Francisco, CA',
        },
        {
          key: 'available',
          label: 'Available',
          type: 'select',
          options: ['false', 'true'],
        },
      ],
    },
    {
      title: 'Social',
      fields: [
        {
          key: 'githubHandle',
          label: 'GitHub',
          type: 'text',
          placeholder: 'janedoe',
        },
        {
          key: 'twitterHandle',
          label: 'Twitter',
          type: 'text',
          placeholder: '@janedoe',
        },
        {
          key: 'websiteUrl',
          label: 'Website',
          type: 'url',
          placeholder: 'https://…',
        },
        {
          key: 'skills',
          label: 'Skills',
          type: 'text',
          placeholder: 'React,TypeScript,Go',
        },
      ],
    },
    {
      title: 'Style',
      fields: [
        {key: 'accentColor', label: 'Accent', type: 'color'},
        {key: 'avatar', label: 'Avatar', type: 'url', placeholder: 'https://…'},
      ],
    },
    SHARED_STYLE,
  ],
  quote: [
    {
      title: 'Quote',
      fields: [
        {
          key: 'quote',
          label: 'Text',
          type: 'text',
          placeholder: 'Build fast. Ship often.',
        },
        {
          key: 'author',
          label: 'Author',
          type: 'text',
          placeholder: 'Your name',
        },
        {
          key: 'kicker',
          label: 'Kicker',
          type: 'text',
          placeholder: 'Engineering',
        },
      ],
    },
    {
      title: 'Style',
      fields: [{key: 'accentColor', label: 'Accent', type: 'color'}],
    },
    SHARED_STYLE,
  ],
  changelog: [
    {
      title: 'Release',
      fields: [
        {
          key: 'productName',
          label: 'Product',
          type: 'text',
          placeholder: 'OG Graph',
        },
        {key: 'version', label: 'Version', type: 'text', placeholder: 'v2.0.0'},
        {
          key: 'headline',
          label: 'Headline',
          type: 'text',
          placeholder: 'Major upgrade',
        },
        {
          key: 'change1',
          label: 'Change 1',
          type: 'text',
          placeholder: 'Add first item',
        },
        {
          key: 'change2',
          label: 'Change 2',
          type: 'text',
          placeholder: 'Add second item',
        },
        {
          key: 'change3',
          label: 'Change 3',
          type: 'text',
          placeholder: 'Add third item',
        },
      ],
    },
    {
      title: 'Style',
      fields: [{key: 'accentColor', label: 'Accent', type: 'color'}],
    },
    SHARED_STYLE,
  ],
  event: [
    {
      title: 'Event',
      fields: [
        {
          key: 'eventName',
          label: 'Event name',
          type: 'text',
          placeholder: 'DesignConf 2026',
        },
        {
          key: 'tagline',
          label: 'Tagline',
          type: 'text',
          placeholder: 'The future of design',
        },
        {key: 'eventDate', label: 'Date', type: 'date'},
        {
          key: 'dateLocale',
          label: 'Locale',
          type: 'text',
          placeholder: 'en-US',
        },
        {
          key: 'location',
          label: 'Location',
          type: 'text',
          placeholder: 'Paris, France',
        },
        {key: 'host', label: 'Host', type: 'text', placeholder: 'Acme Events'},
      ],
    },
    {
      title: 'Style',
      fields: [{key: 'accentColor', label: 'Accent', type: 'color'}],
    },
    SHARED_MEDIA,
    SHARED_STYLE,
  ],
};
