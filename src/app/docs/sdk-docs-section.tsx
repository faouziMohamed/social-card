import {SectionHeader} from '@/app/docs/section-header';
import Link from 'next/link';

export function SdkDocsSection() {
  return (
    <>
      <SectionHeader
        id="sdk"
        icon="📦"
        title="TypeScript SDK"
        subtitle="Install social-card-sdk and generate URLs/buffers programmatically."
        count={1}
      />
      <section className="experience-card mechanical-corners mb-16 overflow-hidden rounded-xl border border-border/60 bg-card/60 shadow-sm">
        <div className="border-b border-border/50 bg-card/80 px-6 py-4 font-mono text-xs text-foreground/85 whitespace-pre-wrap">{`npm install social-card-sdk
pnpm add social-card-sdk
yarn add social-card-sdk`}</div>
        <div className="space-y-3 px-6 py-4 text-sm text-muted-foreground">
          <pre className="rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-xs text-foreground/85 whitespace-pre-wrap">{`import {SocialCardClient} from 'social-card-sdk';
const client = new SocialCardClient();
const ogUrl = client.og.general({title: 'Hello Social Card'});`}</pre>
          <Link
            href="https://www.npmjs.com/package/social-card-sdk"
            className="inline-flex text-xs text-primary hover:underline"
          >
            View package on npm
          </Link>
        </div>
      </section>
    </>
  );
}
