import {
  SHARED_MEDIA,
  SHARED_STYLE,
} from '@/modules/og/shared/og-shared-sections';
import type {FormSection} from '@/modules/og/shared/og-template-registry';
import type {TemplateName} from '@/modules/og/shared/og.types';

export const TEMPLATE_SECTIONS_A: Partial<Record<TemplateName, FormSection[]>> =
  {
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
          {
            key: 'gradientAngle',
            label: 'Angle',
            type: 'text',
            placeholder: '90',
          },
        ],
      },
      SHARED_MEDIA,
      SHARED_STYLE,
    ],
    blog: [
      {
        title: 'Post',
        fields: [
          {
            key: 'title',
            label: 'Title',
            type: 'text',
            placeholder: 'Blog Title',
          },
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
          {
            key: 'banner',
            label: 'Banner',
            type: 'url',
            placeholder: 'https://…',
          },
        ],
      },
      SHARED_STYLE,
    ],
    minimal: [
      {
        title: 'Content',
        fields: [
          {
            key: 'title',
            label: 'Title',
            type: 'text',
            placeholder: 'Your Title',
          },
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
  };
