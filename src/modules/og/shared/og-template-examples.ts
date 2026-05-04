import type {TemplateName} from '@/modules/og/shared/og.types';

export const EXAMPLE_PARAMS: Record<TemplateName, string> = {
  general:
    'siteName=OG+Graph&title=Open+Graph+Generator&description=Self-hostable+social+card+generator&theme=dark&accentColor=%236366f1&fontFamily=geist&bgStyle=gradient%2Bgrid',
  gradient:
    'title=Beautiful+Images&siteName=og-graph&gradientFrom=%2300e887&gradientTo=%2300e0f3&theme=dark&fontFamily=space&bgStyle=aurora%2Bdots',
  blog: 'title=How+to+Build+a+Blog&tags=Next.js%2CTypeScript&authorName=Jane+Doe&siteDomain=myblog.com&theme=dark&fontFamily=inter&bgStyle=mesh%2Bnoise',
  minimal:
    'title=Clean+Design&eyebrow=TUTORIAL&theme=dark&accentColor=%236366f1&fontFamily=serif&bgStyle=solid%2Bvignette',
  article:
    'title=The+Future+of+Web+Dev&excerpt=A+deep+dive+into+modern+tooling&authorName=Jane+Doe&publicationName=Tech+Weekly&theme=dark&fontFamily=inter&bgStyle=gradient%2Bvignette',
  product:
    'productName=My+SaaS&tagline=Build+faster&feature1=Open+source&feature2=Edge+ready&cta=Get+Started&theme=dark&accentColor=%238b5cf6&fontFamily=space&bgStyle=aurora%2Bgrid',
  portfolio:
    'name=Jane+Doe&role=Full-Stack+Developer&skills=React%2CTypeScript%2CGo&available=true&theme=dark&accentColor=%233b82f6&fontFamily=space&bgStyle=aurora%2Bgrid%2Bnoise',
  quote:
    'quote=Build+fast.+Ship+often.&author=Mohamed+Faouzi&kicker=Engineering&theme=dark&accentColor=%2314b8a6&fontFamily=serif&bgStyle=mesh%2Bvignette',
  changelog:
    'productName=OG+Graph&version=v2.1.0&headline=Performance+and+UX+upgrade&change1=New+style+system&change2=Font+controls+for+all+templates&change3=New+endpoint+variants&theme=dark&accentColor=%2338bdf8&fontFamily=inter&bgStyle=gradient%2Bgrid',
  event:
    'eventName=DesignConf+2026&tagline=The+future+of+design&location=Paris%2C+France&host=Acme+Events&theme=dark&accentColor=%23f97316&fontFamily=space&bgStyle=gradient%2Bgrid',
  launch:
    'productName=SuperApp&punchline=The+tool+you+wished+existed&badge=Now+live&highlight1=10%C3%97+faster&highlight2=Open+source&highlight3=Zero+config&theme=dark&accentColor=%23ec4899&fontFamily=geist&bgStyle=aurora%2Bdots',
};

export const DEMO_PARAMS: {template: TemplateName; params: string}[] = [
  {
    template: 'general',
    params:
      'title=Open+Graph+Generator&siteName=og-graph&theme=dark&accentColor=%236366f1&fontFamily=geist&bgStyle=gradient%2Bgrid',
  },
  {
    template: 'gradient',
    params:
      'title=Beautiful+Social+Cards&gradientFrom=%2300e887&gradientTo=%2300e0f3&theme=dark&fontFamily=space&bgStyle=aurora%2Bdots',
  },
  {
    template: 'quote',
    params:
      'quote=No+fluff.+Just+shipping.&author=OG+Graph&theme=dark&fontFamily=serif&bgStyle=mesh%2Bvignette&accentColor=%2314b8a6',
  },
];
