import {FONT_FAMILY_OPTIONS} from './og-font-catalog';
import type {TemplateName} from './og.types';

export interface TemplateMeta {
  name: TemplateName;
  label: string;
  desc: string;
  color: string;
  icon: string;
}

export const TEMPLATE_META: TemplateMeta[] = [
  {
    name: 'general',
    label: 'General',
    desc: 'Logo + title + description',
    color: '#6366f1',
    icon: '⬡',
  },
  {
    name: 'gradient',
    label: 'Gradient',
    desc: 'Vivid gradient headline',
    color: '#22d3ee',
    icon: '◈',
  },
  {
    name: 'blog',
    label: 'Blog',
    desc: 'Two-column with banner',
    color: '#f472b6',
    icon: '▤',
  },
  {
    name: 'minimal',
    label: 'Minimal',
    desc: 'Clean centered typography',
    color: '#94a3b8',
    icon: '▢',
  },
  {
    name: 'article',
    label: 'Article',
    desc: 'Editorial long-form layout',
    color: '#f59e0b',
    icon: '▥',
  },
  {
    name: 'product',
    label: 'Product',
    desc: 'Features + screenshot',
    color: '#a855f7',
    icon: '◉',
  },
  {
    name: 'portfolio',
    label: 'Portfolio',
    desc: 'Avatar + skills showcase',
    color: '#3b82f6',
    icon: '◎',
  },
  {
    name: 'quote',
    label: 'Quote',
    desc: 'Bold quote card',
    color: '#14b8a6',
    icon: '❝',
  },
  {
    name: 'changelog',
    label: 'Changelog',
    desc: 'Release notes card',
    color: '#38bdf8',
    icon: '☰',
  },
  {
    name: 'event',
    label: 'Event',
    desc: 'Conference / meetup card',
    color: '#f97316',
    icon: '◷',
  },
  {
    name: 'launch',
    label: 'Launch',
    desc: 'Product launch announcement',
    color: '#ec4899',
    icon: '◈',
  },
];

export interface SelectOption {
  value: string;
  label: string;
}

export type FieldDef =
  | {key: string; label: string; type: 'text' | 'url'; placeholder?: string}
  | {key: string; label: string; type: 'color'}
  | {
      key: string;
      label: string;
      type: 'select';
      options: (string | SelectOption)[];
    }
  | {
      key: string;
      label: string;
      type: 'multi-select';
      options: (string | SelectOption)[];
    }
  | {key: string; label: string; type: 'date'};

export interface FormSection {
  title: string;
  fields: FieldDef[];
}

const SHARED_STYLE: FormSection = {
  title: 'Global Style',
  fields: [
    {
      key: 'fontFamily',
      label: 'Font',
      type: 'select',
      options: FONT_FAMILY_OPTIONS,
    },
    {
      key: 'bgTone',
      label: 'BG tone',
      type: 'select',
      options: ['dark', 'light', 'custom'],
    },
    {key: 'bgCustomColor', label: 'BG custom', type: 'color'},
    {
      key: 'bgBase',
      label: 'BG base',
      type: 'select',
      options: ['solid', 'gradient', 'aurora', 'mesh'],
    },
    {key: 'bgGradientFrom', label: 'Gradient from', type: 'color'},
    {key: 'bgGradientTo', label: 'Gradient to', type: 'color'},
    {
      key: 'bgOverlays',
      label: 'BG fx',
      type: 'multi-select',
      options: ['grid', 'dots', 'diagonal', 'noise', 'spotlight', 'vignette'],
    },
  ],
};

const SHARED_MEDIA: FormSection = {
  title: 'Logo',
  fields: [{key: 'logo', label: 'URL', type: 'url', placeholder: 'https://…'}],
};

export const TEMPLATE_SECTIONS: Record<TemplateName, FormSection[]> = {
  general: [
    {
      title: 'Content',
      fields: [
        {
          key: 'siteName',
          label: 'Site name',
          type: 'text',
          placeholder: 'My Site',
        },
        {
          key: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Page title (optional)',
        },
        {
          key: 'description',
          label: 'Description',
          type: 'text',
          placeholder: 'Subtitle text',
        },
      ],
    },
    {
      title: 'Style',
      fields: [{key: 'accentColor', label: 'Accent', type: 'color'}],
    },
    SHARED_MEDIA,
    SHARED_STYLE,
  ],
  gradient: [
    {
      title: 'Content',
      fields: [
        {
          key: 'siteName',
          label: 'Site name',
          type: 'text',
          placeholder: 'My Site',
        },
        {
          key: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Gradient headline',
        },
        {
          key: 'description',
          label: 'Description',
          type: 'text',
          placeholder: 'Paragraph below heading',
        },
      ],
    },
    {
      title: 'Gradient',
      fields: [
        {key: 'gradientFrom', label: 'From', type: 'color'},
        {key: 'gradientTo', label: 'To', type: 'color'},
        {key: 'gradientAngle', label: 'Angle', type: 'text', placeholder: '90'},
      ],
    },
    SHARED_MEDIA,
    SHARED_STYLE,
  ],
  blog: [
    {
      title: 'Post',
      fields: [
        {key: 'title', label: 'Title', type: 'text', placeholder: 'Blog Title'},
        {
          key: 'tags',
          label: 'Tags',
          type: 'text',
          placeholder: 'tag1,tag2,tag3',
        },
        {key: 'publishDate', label: 'Date', type: 'date'},
        {
          key: 'dateLocale',
          label: 'Locale',
          type: 'text',
          placeholder: 'en-US',
        },
        {
          key: 'readingTime',
          label: 'Read time',
          type: 'text',
          placeholder: '5 min read',
        },
        {
          key: 'siteDomain',
          label: 'Domain',
          type: 'text',
          placeholder: 'myblog.com',
        },
      ],
    },
    {
      title: 'Author',
      fields: [
        {
          key: 'authorName',
          label: 'Name',
          type: 'text',
          placeholder: 'Jane Doe',
        },
        {
          key: 'authorHandle',
          label: 'Handle',
          type: 'text',
          placeholder: '@janedoe',
        },
        {
          key: 'authorPhoto',
          label: 'Photo',
          type: 'url',
          placeholder: 'https://…',
        },
      ],
    },
    {
      title: 'Style',
      fields: [
        {key: 'accentColor', label: 'Accent', type: 'color'},
        {key: 'banner', label: 'Banner', type: 'url', placeholder: 'https://…'},
      ],
    },
    SHARED_STYLE,
  ],
  minimal: [
    {
      title: 'Content',
      fields: [
        {key: 'title', label: 'Title', type: 'text', placeholder: 'Your Title'},
        {
          key: 'eyebrow',
          label: 'Eyebrow',
          type: 'text',
          placeholder: 'TUTORIAL',
        },
        {
          key: 'description',
          label: 'Description',
          type: 'text',
          placeholder: 'Subtext',
        },
      ],
    },
    {
      title: 'Style',
      fields: [
        {key: 'accentColor', label: 'Accent', type: 'color'},
        {key: 'bgColor', label: 'BG', type: 'color'},
        {key: 'textColor', label: 'Text', type: 'color'},
      ],
    },
    SHARED_STYLE,
  ],
  article: [
    {
      title: 'Article',
      fields: [
        {
          key: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Article Title',
        },
        {
          key: 'excerpt',
          label: 'Excerpt',
          type: 'text',
          placeholder: '1-2 sentence teaser',
        },
        {key: 'publishDate', label: 'Date', type: 'date'},
        {
          key: 'dateLocale',
          label: 'Locale',
          type: 'text',
          placeholder: 'en-US',
        },
        {
          key: 'readingTime',
          label: 'Read time',
          type: 'text',
          placeholder: '8 min read',
        },
      ],
    },
    {
      title: 'Author',
      fields: [
        {
          key: 'authorName',
          label: 'Author',
          type: 'text',
          placeholder: 'Jane Doe',
        },
        {
          key: 'authorPhoto',
          label: 'Photo',
          type: 'url',
          placeholder: 'https://…',
        },
        {
          key: 'publicationName',
          label: 'Publication',
          type: 'text',
          placeholder: 'My Newsletter',
        },
        {
          key: 'publicationLogo',
          label: 'Pub logo',
          type: 'url',
          placeholder: 'https://…',
        },
      ],
    },
    {
      title: 'Style',
      fields: [{key: 'accentColor', label: 'Accent', type: 'color'}],
    },
    SHARED_STYLE,
  ],
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
        {key: 'eventName',  label: 'Event name', type: 'text', placeholder: 'DesignConf 2026'},
        {key: 'tagline',    label: 'Tagline',    type: 'text', placeholder: 'The future of design'},
        {key: 'eventDate',  label: 'Date',       type: 'date'},
        {key: 'dateLocale', label: 'Locale',     type: 'text', placeholder: 'en-US'},
        {key: 'location',   label: 'Location',   type: 'text', placeholder: 'Paris, France'},
        {key: 'host',       label: 'Host',       type: 'text', placeholder: 'Acme Events'},
      ],
    },
    {
      title: 'Style',
      fields: [{key: 'accentColor', label: 'Accent', type: 'color'}],
    },
    SHARED_MEDIA,
    SHARED_STYLE,
  ],
  launch: [
    {
      title: 'Launch',
      fields: [
        {key: 'productName', label: 'Product',   type: 'text', placeholder: 'SuperApp'},
        {key: 'punchline',   label: 'Punchline',  type: 'text', placeholder: 'The tool you wished existed'},
        {key: 'launchDate',  label: 'Launch date', type: 'text', placeholder: 'March 2026'},
        {key: 'badge',       label: 'Badge',      type: 'text', placeholder: 'Now live'},
      ],
    },
    {
      title: 'Highlights',
      fields: [
        {key: 'highlight1', label: 'Highlight 1', type: 'text', placeholder: '10× faster'},
        {key: 'highlight2', label: 'Highlight 2', type: 'text', placeholder: 'Open source'},
        {key: 'highlight3', label: 'Highlight 3', type: 'text', placeholder: 'Zero config'},
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

export const EXAMPLE_PARAMS: Record<TemplateName, string> = {
  general:
    'siteName=OG+Graph&title=Open+Graph+Generator&description=Self-hostable+social+card+generator&theme=dark&accentColor=%236366f1&fontFamily=geist&bgStyle=gradient%2Bgrid',
  gradient:
    'title=Beautiful+Images&siteName=og-graph&gradientFrom=%2300e887&gradientTo=%2300e0f3&theme=dark&fontFamily=space&bgStyle=aurora%2Bdots',
  blog: 'title=How+to+Build+a+Blog&tags=Next.js%2CTypeScript&authorName=Jane+Doe&siteDomain=myblog.com&theme=dark&fontFamily=inter&bgStyle=mesh%2Bnoise',
  minimal:
    'title=Clean+Design&eyebrow=TUTORIAL&theme=dark&accentColor=%236366f1&fontFamily=serif&bgStyle=solid%2Bvignette',
  article:
    'title=The+Future+of+Web+Dev&excerpt=A+deep+dive+into+modern+tooling&authorName=Jane+Doe&publicationName=Tech+Weekly&theme=dark&fontFamily=inter&bgStyle=gradient%2Bvignette',
  product:
    'productName=My+SaaS&tagline=Build+faster&feature1=Open+source&feature2=Edge+ready&cta=Get+Started&theme=dark&accentColor=%238b5cf6&fontFamily=space&bgStyle=aurora%2Bgrid',
  portfolio:
    'name=Jane+Doe&role=Full-Stack+Developer&skills=React%2CTypeScript%2CGo&available=true&theme=dark&accentColor=%233b82f6&fontFamily=space&bgStyle=aurora%2Bgrid%2Bnoise',
  quote:
    'quote=Build+fast.+Ship+often.&author=Mohamed+Faouzi&kicker=Engineering&theme=dark&accentColor=%2314b8a6&fontFamily=serif&bgStyle=mesh%2Bvignette',
  changelog:
    'productName=OG+Graph&version=v2.1.0&headline=Performance+and+UX+upgrade&change1=New+style+system&change2=Font+controls+for+all+templates&change3=New+endpoint+variants&theme=dark&accentColor=%2338bdf8&fontFamily=inter&bgStyle=gradient%2Bgrid',
  event:
    'eventName=DesignConf+2026&tagline=The+future+of+design&location=Paris%2C+France&host=Acme+Events&theme=dark&accentColor=%23f97316&fontFamily=space&bgStyle=gradient%2Bgrid',
  launch:
    'productName=SuperApp&punchline=The+tool+you+wished+existed&badge=Now+live&highlight1=10%C3%97+faster&highlight2=Open+source&highlight3=Zero+config&theme=dark&accentColor=%23ec4899&fontFamily=geist&bgStyle=aurora%2Bdots',
};

export const DEMO_PARAMS: {template: TemplateName; params: string}[] = [
  {
    template: 'general',
    params:
      'title=Open+Graph+Generator&siteName=og-graph&theme=dark&accentColor=%236366f1&fontFamily=geist&bgStyle=gradient%2Bgrid',
  },
  {
    template: 'gradient',
    params:
      'title=Beautiful+Social+Cards&gradientFrom=%2300e887&gradientTo=%2300e0f3&theme=dark&fontFamily=space&bgStyle=aurora%2Bdots',
  },
  {
    template: 'quote',
    params:
      'quote=No+fluff.+Just+shipping.&author=OG+Graph&theme=dark&fontFamily=serif&bgStyle=mesh%2Bvignette&accentColor=%2314b8a6',
  },
];
