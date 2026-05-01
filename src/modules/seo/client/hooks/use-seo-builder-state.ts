'use client';

import {env} from '@/lib/env';
import {SEO_ROUTES} from '@/modules/seo/shared/seo-routes';
import type {SeoTemplateName} from '@/modules/seo/shared/seo-schemas';
import {TEMPLATE_SECTIONS} from '@/modules/seo/shared/seo-template-registry';
import {useCallback, useEffect, useRef, useState} from 'react';

export interface SeoBuilderState {
  template: SeoTemplateName;
  params: Record<string, string>;
  previewUrl: string;
  seoUrl: string;
  setTemplate: (t: SeoTemplateName) => void;
  setParam: (key: string, value: string) => void;
  resetParams: () => void;
}

// ─── Persistence ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'seo-builder-state-v1';

interface TemplateSlot {
  params: Record<string, string>;
}

interface PersistedState {
  current: SeoTemplateName;
  templates: Partial<Record<SeoTemplateName, TemplateSlot>>;
}

function load(): PersistedState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

function save(state: PersistedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable — silently ignore
  }
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useSeoBuilderState(): SeoBuilderState {
  const [template, setTemplateRaw] = useState<SeoTemplateName>('favicon');
  const [params, setParams] = useState<Record<string, string>>({});

  // Restore persisted state after hydration
  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const persisted = load();
    if (!persisted) return;
    const tmpl = persisted.current ?? 'favicon';
    const slot = persisted.templates[tmpl];
    setTemplateRaw(tmpl);
    setParams(slot?.params ?? {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [previewUrl, setPreviewUrl] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildUrl = useCallback(
    (tmpl: SeoTemplateName, p: Record<string, string>) => {
      const base = `${env.deploymentURL}${SEO_ROUTES[tmpl]}`;
      const entries = Object.entries(p).filter(([, v]) => v !== '') as [
        string,
        string,
      ][];
      const query = new URLSearchParams(entries);
      return query.size > 0 ? `${base}?${query.toString()}` : base;
    },
    [],
  );

  const seoUrl = buildUrl(template, params);

  // Debounce preview at 150 ms
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setPreviewUrl(seoUrl), 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [seoUrl]);

  // Persist current template slot whenever params change
  useEffect(() => {
    const prev = load() ?? {current: template, templates: {}};
    save({
      current: template,
      templates: {...prev.templates, [template]: {params}},
    });
  }, [template, params]);

  const setTemplate = (t: SeoTemplateName) => {
    const persisted = load();
    const slot = persisted?.templates[t];
    setTemplateRaw(t);
    setParams(slot?.params ?? {});
  };

  const setParam = useCallback((key: string, value: string) => {
    setParams(prev => ({...prev, [key]: value}));
  }, []);

  const resetParams = useCallback(() => {
    const keys = TEMPLATE_SECTIONS[template].flatMap(s =>
      s.fields.map(f => f.key),
    );
    setParams(prev => {
      const next = {...prev};
      for (const k of keys) delete next[k];
      return next;
    });
  }, [template]);

  return {
    template,
    params,
    previewUrl,
    seoUrl,
    setTemplate,
    setParam,
    resetParams,
  };
}
