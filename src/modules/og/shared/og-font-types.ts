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

export function createGoogleFont(
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

export function createLocalFont(
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
