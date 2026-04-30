import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BuilderIsland } from "@/modules/og/client/components/builder-island";

export const metadata = {
  title: "Builder — OG Graph",
  description: "Interactive Open Graph image builder with live preview and shareable URLs.",
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
              Adjust parameters to generate your image URL. State is stored in the URL — share or bookmark anytime.
            </p>
          </div>
          <Suspense fallback={<div className="h-96 flex items-center justify-center text-muted-fg">Loading builder…</div>}>
            <BuilderIsland />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
