import type {OgFontDefinition} from './og-font-types';

export function createCatalog<T extends readonly OgFontDefinition[]>(
  definitions: T,
): Record<T[number]['key'], T[number]> {
  return Object.fromEntries(
    definitions.map(definition => [definition.key, definition]),
  ) as Record<T[number]['key'], T[number]>;
}
