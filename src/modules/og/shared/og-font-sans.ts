import type {OgFontDefinition} from './og-font-types';
import {createGoogleFont} from './og-font-types';

export const SANS_FONTS: readonly OgFontDefinition[] = [
  createGoogleFont('geist', 'Geist', 'Geist Sans', 'sans', [400, 700], {
    localFiles: [
      {path: 'geist-400.ttf', weight: 400},
      {path: 'geist-700.ttf', weight: 700},
    ],
  }),
  createGoogleFont('inter', 'Inter', 'Inter', 'sans', [400, 700]),
  createGoogleFont(
    'space',
    'Space Grotesk',
    'Space Grotesk',
    'sans',
    [400, 700],
    {
      localFiles: [
        {path: 'space-grotesk-400.ttf', weight: 400},
        {path: 'space-grotesk-700.ttf', weight: 700},
      ],
    },
  ),
  createGoogleFont('ubuntu', 'Ubuntu', 'Ubuntu', 'sans', [400, 700]),
  createGoogleFont('roboto', 'Roboto', 'Roboto', 'sans', [400, 700]),
  createGoogleFont('nunito', 'Nunito', 'Nunito', 'sans', [400, 700]),
  createGoogleFont('poppins', 'Poppins', 'Poppins', 'sans', [400, 700]),
  createGoogleFont('raleway', 'Raleway', 'Raleway', 'sans', [400, 700]),
  createGoogleFont('oswald', 'Oswald', 'Oswald', 'sans', [400, 700]),
  createGoogleFont('dm-sans', 'DM Sans', 'DM Sans', 'sans', [400, 700]),
  createGoogleFont(
    'plus-jakarta',
    'Plus Jakarta Sans',
    'Plus Jakarta Sans',
    'sans',
    [400, 700],
  ),
  createGoogleFont('outfit', 'Outfit', 'Outfit', 'sans', [400, 700]),
  createGoogleFont('figtree', 'Figtree', 'Figtree', 'sans', [400, 700]),
  createGoogleFont('syne', 'Syne', 'Syne', 'sans', [400, 700]),
  createGoogleFont('onest', 'Onest', 'Onest', 'sans', [400, 700]),
  createGoogleFont(
    'bricolage',
    'Bricolage Grotesque',
    'Bricolage Grotesque',
    'sans',
    [400, 700],
  ),
  createGoogleFont(
    'montserrat',
    'Montserrat',
    'Montserrat',
    'sans',
    [400, 700],
  ),
  createGoogleFont('exo2', 'Exo 2', 'Exo 2', 'sans', [400, 700]),
  createGoogleFont('work-sans', 'Work Sans', 'Work Sans', 'sans', [400, 700]),
  createGoogleFont('manrope', 'Manrope', 'Manrope', 'sans', [400, 700]),
  createGoogleFont('barlow', 'Barlow', 'Barlow', 'sans', [400, 700]),
  createGoogleFont('jost', 'Jost', 'Jost', 'sans', [400, 700]),
  createGoogleFont(
    'albert-sans',
    'Albert Sans',
    'Albert Sans',
    'sans',
    [400, 700],
  ),
  createGoogleFont('lexend', 'Lexend', 'Lexend', 'sans', [400, 700]),
];
