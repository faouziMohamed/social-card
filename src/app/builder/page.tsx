import {Footer} from '@/components/layout/Footer';
import {Navbar} from '@/components/layout/Navbar';
import {BuilderIsland} from '@/modules/og/client/components/builder-island';
import type {Metadata} from 'next';
import {Suspense} from 'react';

// product template — showcases the builder's own feature set
const OG_QS =
  'productName=OG+Image+Builder&tagline=Configure+any+template%2C+copy+the+URL&feature1=11+templates&feature2=Live+preview&feature3=Shareable+URL&cta=Open+Builder&theme=dark&accentColor=%236366f1&fontFamily=geist&bgStyle=aurora%2Bgrid';

export const metadata: Metadata = {
  title: 'Builder',
  description:
    'Interactive Open Graph image builder. Configure any template, preview live, and copy a shareable URL — no signup required.',
  alternates: {canonical: '/builder'},
  openGraph: {
    title: 'OG Image Builder — OG Graph',
    description:
      'Configure any OG template, preview live, and copy the URL. State is stored in the URL — share or bookmark anytime.',
    url: '/builder',
    images: [
      {
        url: `/api/og/product?${OG_QS}`,
        width: 1200,
        height: 630,
        alt: 'OG Image Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OG Image Builder — OG Graph',
    description: 'Configure any OG template, preview live, and copy the URL.',
    images: [`/api/og/product?${OG_QS}`],
  },
};

export default function BuilderPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">OG Image Builder</h1>
            <p className="text-sm text-muted-fg mt-1">
              Adjust parameters to generate your image URL. State is stored in
              the URL — share or bookmark anytime.
            </p>
          </div>
          <Suspense
            fallback={
              <div className="h-96 flex items-center justify-center text-muted-fg">
                Loading builder…
              </div>
            }
          >
            <BuilderIsland />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
