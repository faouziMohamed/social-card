import {BuilderPageShell} from '@/app/builder/_components/builder-page-shell';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Builder · SEO',
  alternates: {canonical: '/builder/seo'},
};

export default function SeoBuilderPage() {
  return <BuilderPageShell activeModule="seo" />;
}
