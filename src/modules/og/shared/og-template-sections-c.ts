import {SHARED_MEDIA, SHARED_STYLE} from './og-shared-sections';
import type {FormSection} from './og-template-registry';
import type {TemplateName} from './og.types';

export const TEMPLATE_SECTIONS_C: Partial<Record<TemplateName, FormSection[]>> =
  {
    launch: [
      {
        title: 'Launch',
        fields: [
          {
            key: 'productName',
            label: 'Product',
            type: 'text',
            placeholder: 'SuperApp',
          },
          {
            key: 'punchline',
            label: 'Punchline',
            type: 'text',
            placeholder: 'The tool you wished existed',
          },
          {
            key: 'launchDate',
            label: 'Launch date',
            type: 'text',
            placeholder: 'March 2026',
          },
          {key: 'badge', label: 'Badge', type: 'text', placeholder: 'Now live'},
        ],
      },
      {
        title: 'Highlights',
        fields: [
          {
            key: 'highlight1',
            label: 'Highlight 1',
            type: 'text',
            placeholder: '10× faster',
          },
          {
            key: 'highlight2',
            label: 'Highlight 2',
            type: 'text',
            placeholder: 'Open source',
          },
          {
            key: 'highlight3',
            label: 'Highlight 3',
            type: 'text',
            placeholder: 'Zero config',
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
  };
