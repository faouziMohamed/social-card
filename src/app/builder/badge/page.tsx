import {BuilderPageShell} from '@/app/builder/_components/builder-page-shell';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Builder · Badge',
  alternates: {canonical: '/builder/badge'},
};

export default function BadgeBuilderPage() {
  return <BuilderPageShell activeModule="badge" />;
}
