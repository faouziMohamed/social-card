import {Footer} from '@/components/layout/footer';
import {Navbar} from '@/components/layout/navbar';
import {
  BuilderIsland,
  type ModuleTab,
} from '@/modules/og/client/components/builder-island';
import {Suspense} from 'react';

const COPY_BY_MODULE: Record<ModuleTab, {title: string; description: string}> =
  {
    og: {
      title: 'OG Image Builder',
      description:
        'Adjust parameters to generate your image URL. State is stored locally for each template.',
    },
    badge: {
      title: 'Badge Builder',
      description:
        'Adjust parameters to generate your SVG badge URL. State is stored locally for each template.',
    },
    seo: {
      title: 'SEO Builder',
      description:
        'Build icons, JSON-LD, robots.txt, and meta tags. State is stored locally for each template.',
    },
  };

export function BuilderPageShell({activeModule}: {activeModule: ModuleTab}) {
  const copy = COPY_BY_MODULE[activeModule];

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{copy.title}</h1>
            <p className="text-sm text-muted-fg mt-1">{copy.description}</p>
          </div>
          <Suspense
            fallback={
              <div className="h-96 flex items-center justify-center text-muted-fg">
                Loading builder…
              </div>
            }
          >
            <BuilderIsland activeModule={activeModule} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
