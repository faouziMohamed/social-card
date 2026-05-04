import type {SeoTemplateName} from '@/modules/seo/shared/seo-schemas';

export const DEMO_PARAMS: {template: SeoTemplateName; params: string}[] = [
  {
    template: 'favicon',
    params:
      'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded&theme=dark',
  },
  {
    template: 'apple-touch-icon',
    params:
      'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded&theme=dark',
  },
  {
    template: 'manifest-icon',
    params:
      'initial=OG&color=%230f0f0f&accentColor=%236366f1&shape=rounded&size=512&theme=dark',
  },
  {
    template: 'twitter-card',
    params:
      'title=Open+Graph+Generator&description=Self-hostable+social+card+generator&siteName=og-graph&accentColor=%236366f1&bgStyle=gradient%2Bgrid&theme=dark',
  },
  {
    template: 'json-ld',
    params:
      'schemaType=SoftwareApplication&name=OG+Graph&description=Generate+OG+images%2C+badges%2C+and+SEO+assets&url=https%3A%2F%2Fog-graph.dev&applicationCategory=DeveloperApplication&operatingSystem=Web',
  },
  {
    template: 'robots-txt',
    params:
      'userAgent=*&allow=%2F&disallow=%2Fprivate&sitemap=https%3A%2F%2Fexample.com%2Fsitemap.xml&aiCrawlerPolicy=allow',
  },
  {
    template: 'meta-pack',
    params:
      'title=OG+Graph&description=Generate+OG+images+and+SEO+assets&canonical=https%3A%2F%2Fexample.com&robots=index%2Cfollow%2Cmax-image-preview%3Alarge&ogType=website&ogImage=https%3A%2F%2Fexample.com%2Fog.png&twitterCard=summary_large_image',
  },
  {
    template: 'image-workflow',
    params:
      'sourceImage=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1518770660439-4636190af475&siteName=OG+Graph&title=Open+Graph+Generator&description=Generate+SEO+image+variants+from+one+input&accentColor=%236366f1&theme=dark&bgStyle=gradient%2Bgrid',
  },
];
