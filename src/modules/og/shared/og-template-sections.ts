import type {FormSection} from './og-template-registry';
import {TEMPLATE_SECTIONS_A} from './og-template-sections-a';
import {TEMPLATE_SECTIONS_B} from './og-template-sections-b';
import {TEMPLATE_SECTIONS_C} from './og-template-sections-c';
import type {TemplateName} from './og.types';

export const TEMPLATE_SECTIONS: Record<TemplateName, FormSection[]> = {
  ...TEMPLATE_SECTIONS_A,
  ...TEMPLATE_SECTIONS_B,
  ...TEMPLATE_SECTIONS_C,
} as Record<TemplateName, FormSection[]>;
