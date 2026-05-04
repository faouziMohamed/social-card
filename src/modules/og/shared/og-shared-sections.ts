import {FONT_FAMILY_OPTIONS} from './og-font-catalog';
import type {FormSection} from './og-template-registry';

export const SHARED_STYLE: FormSection = {
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

export const SHARED_MEDIA: FormSection = {
  title: 'Logo',
  fields: [{key: 'logo', label: 'URL', type: 'url', placeholder: 'https://…'}],
};
