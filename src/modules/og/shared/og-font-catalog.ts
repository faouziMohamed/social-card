export type OgFontCategory = 'sans' | 'serif' | 'mono' | 'display';
export type OgFontSource = 'google' | 'local';
export type OgFontStyle = 'normal' | 'italic';

export interface OgFontFile {
  path: string;
  weight: number;
  style?: OgFontStyle;
}

export interface OgFontDefinition {
  key: string;
  family: string;
  displayName: string;
  category: OgFontCategory;
  source: OgFontSource;
  weights: readonly number[];
  ligatures: boolean;
  fallbackKey: string;
  localFiles?: readonly OgFontFile[];
}

export const CATEGORY_FALLBACK_KEYS: Record<OgFontCategory, string> = {
  sans: 'geist',
  serif: 'serif',
  mono: 'mono',
  display: 'space',
};

export const OG_FONT_CATALOG = createCatalog([
  // sans
  createGoogleFont('geist', 'Geist', 'Geist Sans', 'sans', [400, 700], {
    localFiles: [
      { path: 'geist-400.ttf', weight: 400 },
      { path: 'geist-700.ttf', weight: 700 },
    ],
  }),
  createGoogleFont('inter', 'Inter', 'Inter', 'sans', [400, 700]),
  createGoogleFont('space', 'Space Grotesk', 'Space Grotesk', 'sans', [400, 700], {
    localFiles: [
      { path: 'space-grotesk-400.ttf', weight: 400 },
      { path: 'space-grotesk-700.ttf', weight: 700 },
    ],
  }),
  createGoogleFont('ubuntu', 'Ubuntu', 'Ubuntu', 'sans', [400, 700]),
  createGoogleFont('roboto', 'Roboto', 'Roboto', 'sans', [400, 700]),
  createGoogleFont('nunito', 'Nunito', 'Nunito', 'sans', [400, 700]),
  createGoogleFont('poppins', 'Poppins', 'Poppins', 'sans', [400, 700]),
  createGoogleFont('raleway', 'Raleway', 'Raleway', 'sans', [400, 700]),
  createGoogleFont('oswald', 'Oswald', 'Oswald', 'sans', [400, 700]),
  createGoogleFont('dm-sans', 'DM Sans', 'DM Sans', 'sans', [400, 700]),
  createGoogleFont('plus-jakarta', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'sans', [400, 700]),
  createGoogleFont('outfit', 'Outfit', 'Outfit', 'sans', [400, 700]),
  createGoogleFont('figtree', 'Figtree', 'Figtree', 'sans', [400, 700]),
  createGoogleFont('syne', 'Syne', 'Syne', 'sans', [400, 700]),
  createGoogleFont('onest', 'Onest', 'Onest', 'sans', [400, 700]),
  createGoogleFont('bricolage', 'Bricolage Grotesque', 'Bricolage Grotesque', 'sans', [400, 700]),
  createGoogleFont('montserrat', 'Montserrat', 'Montserrat', 'sans', [400, 700]),
  createGoogleFont('exo2', 'Exo 2', 'Exo 2', 'sans', [400, 700]),
  createGoogleFont('work-sans', 'Work Sans', 'Work Sans', 'sans', [400, 700]),
  createGoogleFont('manrope', 'Manrope', 'Manrope', 'sans', [400, 700]),
  createGoogleFont('barlow', 'Barlow', 'Barlow', 'sans', [400, 700]),
  createGoogleFont('jost', 'Jost', 'Jost', 'sans', [400, 700]),
  createGoogleFont('albert-sans', 'Albert Sans', 'Albert Sans', 'sans', [400, 700]),
  createGoogleFont('lexend', 'Lexend', 'Lexend', 'sans', [400, 700]),
  // serif
  createGoogleFont('serif', 'Merriweather', 'Merriweather', 'serif', [400, 700], {
    localFiles: [
      { path: 'merriweather-400.ttf', weight: 400 },
      { path: 'merriweather-700.ttf', weight: 700 },
    ],
  }),
  createGoogleFont('playfair', 'Playfair Display', 'Playfair Display', 'serif', [400, 700]),
  createGoogleFont('lora', 'Lora', 'Lora', 'serif', [400, 700]),
  createGoogleFont('dm-serif', 'DM Serif Display', 'DM Serif Display', 'serif', [400]),
  createGoogleFont('fraunces', 'Fraunces', 'Fraunces', 'serif', [400, 700]),
  createGoogleFont('instrument-serif', 'Instrument Serif', 'Instrument Serif', 'serif', [400]),
  createGoogleFont('libre-baskerville', 'Libre Baskerville', 'Libre Baskerville', 'serif', [400, 700]),
  createGoogleFont('eb-garamond', 'EB Garamond', 'EB Garamond', 'serif', [400, 700]),
  createGoogleFont('cormorant', 'Cormorant Garamond', 'Cormorant Garamond', 'serif', [400, 700]),
  createGoogleFont('bitter', 'Bitter', 'Bitter', 'serif', [400, 700]),
  createGoogleFont('crimson-pro', 'Crimson Pro', 'Crimson Pro', 'serif', [400, 700]),
  createGoogleFont('source-serif4', 'Source Serif 4', 'Source Serif 4', 'serif', [400, 700]),
  // mono
  createGoogleFont('mono', 'JetBrains Mono', 'JetBrains Mono', 'mono', [400, 700], {
    ligatures: true,
    localFiles: [
      { path: 'jetbrains-mono-400.ttf', weight: 400 },
      { path: 'jetbrains-mono-700.ttf', weight: 700 },
    ],
  }),
  createGoogleFont('fira-code', 'Fira Code', 'Fira Code', 'mono', [400, 700], { ligatures: true }),
  createGoogleFont('roboto-mono', 'Roboto Mono', 'Roboto Mono', 'mono', [400, 700]),
  createGoogleFont('source-code-pro', 'Source Code Pro', 'Source Code Pro', 'mono', [400, 700]),
  createGoogleFont('space-mono', 'Space Mono', 'Space Mono', 'mono', [400, 700]),
  createGoogleFont('ubuntu-mono', 'Ubuntu Mono', 'Ubuntu Mono', 'mono', [400, 700]),
  createGoogleFont('inconsolata', 'Inconsolata', 'Inconsolata', 'mono', [400, 700]),
  createGoogleFont('dm-mono', 'DM Mono', 'DM Mono', 'mono', [400, 500]),
  createGoogleFont('azeret-mono', 'Azeret Mono', 'Azeret Mono', 'mono', [400, 700]),
  createGoogleFont('overpass-mono', 'Overpass Mono', 'Overpass Mono', 'mono', [400, 700]),
  createGoogleFont('share-tech-mono', 'Share Tech Mono', 'Share Tech Mono', 'mono', [400]),
  createGoogleFont('chivo-mono', 'Chivo Mono', 'Chivo Mono', 'mono', [400, 700]),
  createGoogleFont('courier-prime', 'Courier Prime', 'Courier Prime', 'mono', [400, 700]),
  createGoogleFont('victor-mono', 'Victor Mono', 'Victor Mono', 'mono', [400, 700], { ligatures: true }),
  createGoogleFont('cascadia-code', 'Cascadia Code', 'Cascadia Code', 'mono', [400], { ligatures: true }),
  createLocalFont('commit-mono', 'Commit Mono', 'Commit Mono', 'mono', [400, 700], [
    { path: 'commit-mono-400.otf', weight: 400 },
    { path: 'commit-mono-700.otf', weight: 700 },
  ], { ligatures: true }),
  createLocalFont('maple-mono', 'Maple Mono', 'Maple Mono', 'mono', [400, 700], [
    { path: 'maple-mono-400.ttf', weight: 400 },
    { path: 'maple-mono-700.ttf', weight: 700 },
  ], { ligatures: true }),
  createLocalFont('monaspace-neon', 'Monaspace Neon', 'Monaspace Neon', 'mono', [400, 700], [
    { path: 'monaspace-neon-400.otf', weight: 400 },
    { path: 'monaspace-neon-700.otf', weight: 700 },
  ], { ligatures: true }),
  createLocalFont('monaspace-argon', 'Monaspace Argon', 'Monaspace Argon', 'mono', [400], [
    { path: 'monaspace-argon-400.otf', weight: 400 },
  ], { ligatures: true }),
  createLocalFont('monaspace-krypton', 'Monaspace Krypton', 'Monaspace Krypton', 'mono', [400], [
    { path: 'monaspace-krypton-400.otf', weight: 400 },
  ], { ligatures: true }),
  createLocalFont('monaspace-xenon', 'Monaspace Xenon', 'Monaspace Xenon', 'mono', [400], [
    { path: 'monaspace-xenon-400.otf', weight: 400 },
  ], { ligatures: true }),
  createLocalFont('monaspace-radon', 'Monaspace Radon', 'Monaspace Radon', 'mono', [400], [
    { path: 'monaspace-radon-400.otf', weight: 400 },
  ], { ligatures: true }),
  // display
  createGoogleFont('dancing-script', 'Dancing Script', 'Dancing Script', 'display', [400, 700]),
  createGoogleFont('pacifico', 'Pacifico', 'Pacifico', 'display', [400]),
  createGoogleFont('caveat', 'Caveat', 'Caveat', 'display', [400, 700]),
  createGoogleFont('satisfy', 'Satisfy', 'Satisfy', 'display', [400]),
  createGoogleFont('kaushan-script', 'Kaushan Script', 'Kaushan Script', 'display', [400]),
  createGoogleFont('sacramento', 'Sacramento', 'Sacramento', 'display', [400]),
  createGoogleFont('great-vibes', 'Great Vibes', 'Great Vibes', 'display', [400]),
  createGoogleFont('righteous', 'Righteous', 'Righteous', 'display', [400]),
  createGoogleFont('dela-gothic', 'Dela Gothic One', 'Dela Gothic One', 'display', [400]),
  createGoogleFont('bungee', 'Bungee', 'Bungee', 'display', [400]),
  createGoogleFont('abril-fatface', 'Abril Fatface', 'Abril Fatface', 'display', [400]),
  createGoogleFont('anton', 'Anton', 'Anton', 'display', [400]),
  createGoogleFont('permanent-marker', 'Permanent Marker', 'Permanent Marker', 'display', [400]),
  createGoogleFont('architects-daughter', 'Architects Daughter', 'Architects Daughter', 'display', [400]),
  createGoogleFont('indie-flower', 'Indie Flower', 'Indie Flower', 'display', [400]),
  createGoogleFont('gloria-hallelujah', 'Gloria Hallelujah', 'Gloria Hallelujah', 'display', [400]),
  createGoogleFont('lobster', 'Lobster', 'Lobster', 'display', [400]),
  createGoogleFont('bebas-neue', 'Bebas Neue', 'Bebas Neue', 'display', [400]),
] as const);

export type OgFontKey = keyof typeof OG_FONT_CATALOG;

export const FONT_FAMILY_KEYS = Object.keys(OG_FONT_CATALOG) as OgFontKey[];
export const FONT_FAMILY_VALUES = FONT_FAMILY_KEYS as [OgFontKey, ...OgFontKey[]];
export const FONT_FAMILY_OPTIONS = FONT_FAMILY_KEYS.map((key) => ({
  value: key,
  label: OG_FONT_CATALOG[key].displayName,
}));

export function resolveFontFamilyName(fontFamily: string): string {
  return resolveOgFontDefinition(fontFamily).family;
}

export function resolveOgFontDefinition(fontFamily: string): OgFontDefinition {
  return OG_FONT_CATALOG[fontFamily as OgFontKey] ?? OG_FONT_CATALOG.geist;
}

export function supportsOgLigatures(fontFamily: string): boolean {
  return resolveOgFontDefinition(fontFamily).ligatures;
}

export function isOgFontCategory(fontFamily: string, category: OgFontCategory): boolean {
  return resolveOgFontDefinition(fontFamily).category === category;
}

function createCatalog<T extends readonly OgFontDefinition[]>(definitions: T): Record<T[number]['key'], T[number]> {
  return Object.fromEntries(definitions.map((definition) => [definition.key, definition])) as Record<T[number]['key'], T[number]>;
}

function createGoogleFont(
  key: string,
  family: string,
  displayName: string,
  category: OgFontCategory,
  weights: readonly number[],
  options: {
    ligatures?: boolean;
    localFiles?: readonly OgFontFile[];
    fallbackKey?: string;
  } = {},
): OgFontDefinition {
  return {
    key,
    family,
    displayName,
    category,
    source: 'google',
    weights,
    ligatures: options.ligatures ?? false,
    fallbackKey: options.fallbackKey ?? CATEGORY_FALLBACK_KEYS[category],
    localFiles: options.localFiles,
  };
}

function createLocalFont(
  key: string,
  family: string,
  displayName: string,
  category: OgFontCategory,
  weights: readonly number[],
  localFiles: readonly OgFontFile[],
  options: {
    ligatures?: boolean;
    fallbackKey?: string;
  } = {},
): OgFontDefinition {
  return {
    key,
    family,
    displayName,
    category,
    source: 'local',
    weights,
    ligatures: options.ligatures ?? false,
    fallbackKey: options.fallbackKey ?? CATEGORY_FALLBACK_KEYS[category],
    localFiles,
  };
}
