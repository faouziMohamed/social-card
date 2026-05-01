import {env} from '@/lib/env';
import type {MetadataRoute} from 'next';

const ICON_QS =
  'initial=O&accentColor=%236366f1&color=%230f0f0f&shape=rounded&theme=dark';

export default function manifest(): MetadataRoute.Manifest {
  const base = env.deploymentURL;

  return {
    name: 'OG Graph',
    short_name: 'OG Graph',
    description:
      'Self-hostable, API-first Open Graph image generator. 11 templates, 8 SVG badges, 4 SEO assets.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f0f',
    theme_color: '#6366f1',
    icons: [
      {
        src: `${base}/api/seo/manifest-icon?${ICON_QS}&size=192`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: `${base}/api/seo/manifest-icon?${ICON_QS}&size=512`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: `${base}/api/seo/manifest-icon?${ICON_QS}&size=192`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: `${base}/api/seo/manifest-icon?${ICON_QS}&size=512`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
