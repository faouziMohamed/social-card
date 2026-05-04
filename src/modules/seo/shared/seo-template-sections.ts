import type {FormSection} from '@/modules/og/shared/og-template-registry';
import type {SeoTemplateName} from './seo-schemas';
import {ICON_TEMPLATE_SECTIONS} from './seo-template-sections-icon';
import {JSON_LD_TEMPLATE_SECTIONS} from './seo-template-sections-json-ld';
import {TEXT_TEMPLATE_SECTIONS} from './seo-template-sections-text';

export const TEMPLATE_SECTIONS: Record<SeoTemplateName, FormSection[]> = {
  ...ICON_TEMPLATE_SECTIONS,
  ...JSON_LD_TEMPLATE_SECTIONS,
  ...TEXT_TEMPLATE_SECTIONS,
} as Record<SeoTemplateName, FormSection[]>;
