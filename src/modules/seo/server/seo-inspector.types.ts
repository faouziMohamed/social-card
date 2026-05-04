export interface SeoInspectorFinding {
  id: string;
  severity: 'error' | 'warning' | 'info';
  title: string;
  detail: string;
  recommendation: string;
}

export interface SeoInspectorResult {
  url: string;
  finalUrl: string;
  statusCode: number;
  title: string;
  metaDescription: string;
  canonical: string;
  robots: string;
  og: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
    site: string;
  };
  icons: {
    favicon: string;
    appleTouchIcon: string;
    manifest: string;
  };
  headings: {
    h1Count: number;
    h1: string[];
  };
  images: {
    total: number;
    missingAlt: number;
  };
  jsonLd: {
    count: number;
    invalidCount: number;
    types: string[];
  };
  findings: SeoInspectorFinding[];
}

export interface SeoInspectorApiResponse {
  success: true;
  inspectedAt: string;
  summary: {
    score: number;
    totalFindings: number;
    errors: number;
    warnings: number;
    infos: number;
  };
  findingsBySeverity: {
    error: SeoInspectorFinding[];
    warning: SeoInspectorFinding[];
    info: SeoInspectorFinding[];
  };
  data: SeoInspectorResult;
}
