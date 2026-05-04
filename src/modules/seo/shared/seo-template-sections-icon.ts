import type {FormSection} from '@/modules/og/shared/og-template-registry';
import type {SeoTemplateName} from './seo-schemas';
import {ICON_BASE_SECTIONS} from './seo-shared-sections';

export const ICON_TEMPLATE_SECTIONS: Record<
  Extract<SeoTemplateName, 'favicon' | 'apple-touch-icon' | 'manifest-icon'>,
  FormSection[]
> = {
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
  ],
};
