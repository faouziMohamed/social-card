import { BADGE_SCHEMAS, type BadgeName } from './badge-schemas';

export interface BadgeParamDescriptor {
  name:          string;
  type:          string;
  defaultValue?: string;
  description:   string;
  required:      boolean;
}

export function getBadgeParamDescriptors(badge: BadgeName): BadgeParamDescriptor[] {
  const schema = BADGE_SCHEMAS[badge];
  const shape = (schema as unknown as { shape: Record<string, unknown> }).shape ?? {};

  return Object.entries(shape).map(([name, field]) => {
    const f = field as {
      description?: string;
      isOptional?: () => boolean;
      _def?: {
        defaultValue?: unknown;
        typeName?: string;
        innerType?: { _def?: { typeName?: string; values?: string[] } };
      };
    };
    const def      = f._def ?? {};
    const typeName = (def.innerType?._def?.typeName ?? def.typeName ?? 'ZodString') as string;
    const friendly = typeName.includes('ZodEnum')
      ? (def.innerType?._def?.values ?? []).join(' | ')
      : typeName.replace('Zod', '').toLowerCase();

    let defaultValue: string | undefined;
    if (typeof def.defaultValue === 'function') {
      try { defaultValue = String((def.defaultValue as () => unknown)()); } catch { /* skip */ }
    }

    const optional = typeof f.isOptional === 'function' ? f.isOptional() : false;

    return {
      name,
      type:        friendly,
      defaultValue,
      description: f.description ?? '',
      required:    !optional && defaultValue === undefined,
    };
  });
}
