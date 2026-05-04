import type {OgFontDefinition} from './og-font-types';
import {createGoogleFont} from './og-font-types';

export const SERIF_FONTS: readonly OgFontDefinition[] = [
  createGoogleFont(
    'serif',
    'Merriweather',
    'Merriweather',
    'serif',
    [400, 700],
    {
      localFiles: [
        {path: 'merriweather-400.ttf', weight: 400},
        {path: 'merriweather-700.ttf', weight: 700},
      ],
    },
  ),
  createGoogleFont(
    'playfair',
    'Playfair Display',
    'Playfair Display',
    'serif',
    [400, 700],
  ),
  createGoogleFont('lora', 'Lora', 'Lora', 'serif', [400, 700]),
  createGoogleFont(
    'dm-serif',
    'DM Serif Display',
    'DM Serif Display',
    'serif',
    [400],
  ),
  createGoogleFont('fraunces', 'Fraunces', 'Fraunces', 'serif', [400, 700]),
  createGoogleFont(
    'instrument-serif',
    'Instrument Serif',
    'Instrument Serif',
    'serif',
    [400],
  ),
  createGoogleFont(
    'libre-baskerville',
    'Libre Baskerville',
    'Libre Baskerville',
    'serif',
    [400, 700],
  ),
  createGoogleFont(
    'eb-garamond',
    'EB Garamond',
    'EB Garamond',
    'serif',
    [400, 700],
  ),
  createGoogleFont(
    'cormorant',
    'Cormorant Garamond',
    'Cormorant Garamond',
    'serif',
    [400, 700],
  ),
  createGoogleFont('bitter', 'Bitter', 'Bitter', 'serif', [400, 700]),
  createGoogleFont(
    'crimson-pro',
    'Crimson Pro',
    'Crimson Pro',
    'serif',
    [400, 700],
  ),
  createGoogleFont(
    'source-serif4',
    'Source Serif 4',
    'Source Serif 4',
    'serif',
    [400, 700],
  ),
];
