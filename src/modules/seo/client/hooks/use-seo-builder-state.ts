'use client';

import {env} from '@/lib/env';
import {SEO_ROUTES} from '@/modules/seo/shared/seo-routes';
import type {SeoTemplateName} from '@/modules/seo/shared/seo-schemas';
import {TEMPLATE_SECTIONS} from '@/modules/seo/shared/seo-template-registry';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

// ─── Validation ──────────────────────────────────────────────────────────────

const VALID_SEO = new Set(Object.keys(TEMPLATE_SECTIONS) as SeoTemplateName[]);

function toValidSeo(value: unknown): SeoTemplateName {
  return typeof value === 'string' && VALID_SEO.has(value as SeoTemplateName)
    ? (value as SeoTemplateName)
    : 'favicon';
}

export interface SeoBuilderState {
  template: SeoTemplateName;
  params: Record<string, string>;
  previewUrl: string;
  seoUrl: string;
  setTemplate: (t: SeoTemplateName) => void;
  setParam: (key: string, value: string) => void;
  removeParam: (key: string) => void;
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

interface InitialSeoSlot {
  template: SeoTemplateName;
  params: Record<string, string>;
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

function resolveInitialSeoSlot(): InitialSeoSlot {
  const persisted = load();
  if (!persisted) {
    return {
      template: 'favicon',
      params: {},
    };
  }
  const template = toValidSeo(persisted.current);
  const slot = persisted.templates[template];
  return {
    template,
    params: slot?.params ?? {},
  };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useSeoBuilderState(): SeoBuilderState {
  const initialSlot = useMemo(() => resolveInitialSeoSlot(), []);
  const [template, setTemplateRaw] = useState<SeoTemplateName>(
    initialSlot.template,
  );
  const [params, setParams] = useState<Record<string, string>>(
    initialSlot.params,
  );

  const [previewUrl, setPreviewUrl] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildUrl = useCallback(
    (tmpl: SeoTemplateName, p: Record<string, string>) => {
      const route = SEO_ROUTES[tmpl];
      if (!route) return '';
      const base = `${env.deploymentURL}${route}`;
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

  const removeParam = useCallback((key: string) => {
    setParams(prev => {
      const next = {...prev};
      delete next[key];
      return next;
    });
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
    removeParam,
    resetParams,
  };
}
