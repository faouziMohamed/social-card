// Docs param descriptors derived from Zod schemas.
// Replaces the fragile raw ._def / .isOptional() introspection in the docs page.
import {TEMPLATE_SCHEMAS} from '@/modules/og/shared/og-schemas';
import type {TemplateName} from '@/modules/og/shared/og.types';

export interface ParamDescriptor {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required: boolean;
}

export function getParamDescriptors(template: TemplateName): ParamDescriptor[] {
  const schema = TEMPLATE_SCHEMAS[template];
  // Access the merged shape via ZodObject's .shape property
  const shape =
    (schema as unknown as {shape: Record<string, unknown>}).shape ?? {};

  return Object.entries(shape).map(([name, field]) => {
    const f = field as {
      description?: string;
      isOptional?: () => boolean;
      _def?: {
        defaultValue?: unknown;
        typeName?: string;
        innerType?: {_def?: {typeName?: string; values?: string[]}};
      };
    };
    const def = f._def ?? {};
    const typeName = (def.innerType?._def?.typeName ??
      def.typeName ??
      'ZodString') as string;
    const friendly = typeName.includes('ZodEnum')
      ? (def.innerType?._def?.values ?? []).join(' | ')
      : typeName.replace('Zod', '').toLowerCase();

    let defaultValue: string | undefined;
    if (typeof def.defaultValue === 'function') {
      try {
        defaultValue = String((def.defaultValue as () => unknown)());
      } catch {
        /* skip */
      }
    }

    const optional =
      typeof f.isOptional === 'function'
        ? f.isOptional()
        : typeName.includes('Optional');

    return {
      name,
      type: friendly,
      defaultValue,
      description: f.description ?? '',
      required: !optional && defaultValue === undefined,
    };
  });
}
