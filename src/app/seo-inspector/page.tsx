import {Footer} from '@/components/layout/footer';
import {Navbar} from '@/components/layout/navbar';
import {SeoInspectorClient} from '@/modules/seo/client/components/seo-inspector-client';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'SEO Inspector',
  description:
    'Inspect a page URL server-side and get SEO diagnostics, previews, and recommendations.',
  alternates: {canonical: '/seo-inspector'},
  openGraph: {
    title: 'SEO Inspector — Social Card',
    description:
      'Inspect any page URL server-side for SEO tags, previews, and actionable fixes.',
    url: '/seo-inspector',
  },
  twitter: {
    card: 'summary',
    title: 'SEO Inspector — Social Card',
    description:
      'Inspect any page URL server-side for SEO tags, previews, and actionable fixes.',
  },
};

export default function SeoInspectorPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">SEO Inspector</h1>
            <p className="text-sm text-muted-fg mt-1">
              Inspect one URL and get SEO findings with concrete
              recommendations.
            </p>
          </div>
          <SeoInspectorClient />
        </div>
      </main>
      <Footer />
    </div>
  );
}
