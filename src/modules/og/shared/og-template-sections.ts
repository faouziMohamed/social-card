import type {FormSection} from '@/modules/og/shared/og-template-registry';
import {TEMPLATE_SECTIONS_A} from '@/modules/og/shared/og-template-sections-a';
import {TEMPLATE_SECTIONS_B} from '@/modules/og/shared/og-template-sections-b';
import {TEMPLATE_SECTIONS_C} from '@/modules/og/shared/og-template-sections-c';
import type {TemplateName} from '@/modules/og/shared/og.types';

export const TEMPLATE_SECTIONS: Record<TemplateName, FormSection[]> = {
  ...TEMPLATE_SECTIONS_A,
  ...TEMPLATE_SECTIONS_B,
  ...TEMPLATE_SECTIONS_C,
} as Record<TemplateName, FormSection[]>;
