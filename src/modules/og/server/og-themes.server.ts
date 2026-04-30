export type ThemeName = 'dark' | 'light' | 'auto';

export type ThemePalette = {
  bg:          string;
  bgSecondary: string;
  text:        string;
  textMuted:   string;
  border:      string;
  tagBg:       string;
  tagText:     string;
};

export const themes: Record<Exclude<ThemeName, 'auto'>, ThemePalette> = {
  dark: {
    bg:          '#0f0f0f',
    bgSecondary: '#1a1a1a',
    text:        '#ffffff',
    textMuted:   '#a1a1aa',
    border:      '#27272a',
    tagBg:       '#27272a',
    tagText:     '#e4e4e7',
  },
  light: {
    bg:          '#ffffff',
    bgSecondary: '#f4f4f5',
    text:        '#09090b',
    textMuted:   '#52525b',
    border:      '#e4e4e7',
    tagBg:       '#f4f4f5',
    tagText:     '#3f3f46',
  },
};

// 'auto' resolves to 'dark' on server (safe default for social cards)
export function resolveTheme(theme: ThemeName): ThemePalette {
  return themes[theme === 'auto' ? 'dark' : theme];
}
