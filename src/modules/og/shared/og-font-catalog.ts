import {DISPLAY_FONTS} from './og-font-display';
import {MONO_FONTS} from './og-font-mono';
import {SANS_FONTS} from './og-font-sans';
import {SERIF_FONTS} from './og-font-serif';
import type {OgFontCategory, OgFontDefinition} from './og-font-types';
import {createCatalog} from './og-font-utils';

export {
  CATEGORY_FALLBACK_KEYS,
  createGoogleFont,
  createLocalFont,
  type OgFontCategory,
  type OgFontDefinition,
  type OgFontFile,
  type OgFontSource,
  type OgFontStyle,
} from './og-font-types';

export const OG_FONT_CATALOG = createCatalog([
  ...SANS_FONTS,
  ...SERIF_FONTS,
  ...MONO_FONTS,
  ...DISPLAY_FONTS,
] as const);

export type OgFontKey = keyof typeof OG_FONT_CATALOG;

const UNSUPPORTED_OG_FONT_KEYS = new Set<OgFontKey>([
  'commit-mono',
  'monaspace-neon',
  'monaspace-argon',
  'monaspace-krypton',
  'monaspace-xenon',
  'monaspace-radon',
]);

export const FONT_FAMILY_KEYS = Object.keys(OG_FONT_CATALOG) as OgFontKey[];
export const FONT_FAMILY_VALUES = FONT_FAMILY_KEYS as [
  OgFontKey,
  ...OgFontKey[],
];
export const FONT_FAMILY_OPTIONS = FONT_FAMILY_KEYS.filter(
  key => !UNSUPPORTED_OG_FONT_KEYS.has(key),
).map(key => ({value: key, label: OG_FONT_CATALOG[key].displayName}));
export const FONT_FAMILY_GROUPS = createFontFamilyGroups();

export function resolveFontFamilyName(fontFamily: string): string {
  return resolveOgFontDefinition(fontFamily).family;
}

export function resolveOgFontDefinition(fontFamily: string): OgFontDefinition {
  const definition = OG_FONT_CATALOG[fontFamily as OgFontKey];

  if (!definition) {
    return OG_FONT_CATALOG.geist;
  }

  if (UNSUPPORTED_OG_FONT_KEYS.has(definition.key)) {
    return (
      OG_FONT_CATALOG[definition.fallbackKey as OgFontKey] ??
      OG_FONT_CATALOG.geist
    );
  }

  return definition;
}

export function supportsOgLigatures(fontFamily: string): boolean {
  return resolveOgFontDefinition(fontFamily).ligatures;
}

export function isOgFontCategory(
  fontFamily: string,
  category: OgFontCategory,
): boolean {
  return resolveOgFontDefinition(fontFamily).category === category;
}

function createFontFamilyGroups(): Array<{
  key: OgFontCategory;
  label: string;
  options: Array<{value: OgFontKey; label: string}>;
}> {
  const groupLabels: Record<OgFontCategory, string> = {
    sans: 'Sans',
    serif: 'Serif',
    mono: 'Mono',
    display: 'Cursive / Display',
  };
  const groups: Record<
    OgFontCategory,
    Array<{value: OgFontKey; label: string}>
  > = {
    sans: [],
    serif: [],
    mono: [],
    display: [],
  };

  for (const key of FONT_FAMILY_KEYS) {
    const definition = OG_FONT_CATALOG[key];
    groups[definition.category].push({
      value: key,
      label: definition.displayName,
    });
  }

  return (Object.keys(groups) as OgFontCategory[])
    .map(category => ({
      key: category,
      label: groupLabels[category],
      options: groups[category],
    }))
    .filter(group => group.options.length > 0);
}
