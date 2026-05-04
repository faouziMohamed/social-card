// URL builder for OG API endpoints.
// Safe to import in both client and server code.
import {OG_ROUTES} from '@/modules/og/shared/og-routes';
import type {TemplateName} from '@/modules/og/shared/og.types';

export type OGQueryOptions = {
  template?: TemplateName;
  [key: string]: string | number | undefined;
};

export function buildOgUrl(
  deploymentURL: string,
  {template = 'general', ...params}: OGQueryOptions,
): string {
  const base = `${deploymentURL}${OG_ROUTES[template]}`;
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    )
    .join('&');
  return qs ? `${base}?${qs}` : base;
}
