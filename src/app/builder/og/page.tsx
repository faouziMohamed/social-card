import {BuilderPageShell} from '@/app/builder/_components/builder-page-shell';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Builder · OG',
  alternates: {canonical: '/builder/og'},
};

export default function OgBuilderPage() {
  return <BuilderPageShell activeModule="og" />;
}
