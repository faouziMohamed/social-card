import type {FormSection} from '@/modules/og/shared/og-template-registry';

export const SHARED_THEME: FormSection = {
  title: 'Theme',
  fields: [
    {key: 'theme', label: 'Theme', type: 'select', options: ['dark', 'light']},
  ],
};

export const ICON_BASE_SECTIONS: FormSection[] = [
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
