"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { OG_ROUTES } from "@/modules/og/shared/og-routes";
import { TEMPLATE_SECTIONS } from "@/modules/og/shared/og-template-registry";
import { env } from "@/lib/env";
import type { TemplateName } from "@/modules/og/shared/og.types";

export type TargetKey = "og" | "twitter-large" | "twitter-small" | "linkedin";

export interface BuilderState {
  template:    TemplateName;
  params:      Record<string, string>;
  target:      TargetKey;
  previewSrc:  string;
  ogUrl:       string;
  setTemplate: (t: TemplateName) => void;
  setParam:    (key: string, value: string) => void;
  setTarget:   (t: TargetKey) => void;
  resetParams: () => void;
}

// ─── Persistence ────────────────────────────────────────────────────────────

const STORAGE_KEY = "og-builder-state-v2";

interface TemplateSlot {
  params: Record<string, string>;
  target: TargetKey;
}

interface PersistedState {
  current: TemplateName;
  templates: Partial<Record<TemplateName, TemplateSlot>>;
}

function load(): PersistedState | null {
  if (typeof window === "undefined") return null;
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

export function useBuilderState(): BuilderState {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  // Resolve initial template: URL param wins, then persisted, then default
  const initialTemplate = useMemo<TemplateName>(() => {
    const url = searchParams.get("template") as TemplateName | null;
    if (url) return url;
    return load()?.current ?? "general";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [template, setTemplateRaw] = useState<TemplateName>(initialTemplate);

  const [params, setParams] = useState<Record<string, string>>(() => {
    const persisted = load();
    return persisted?.templates[initialTemplate]?.params ?? {};
  });

  const [target, setTargetRaw] = useState<TargetKey>(() => {
    const persisted = load();
    return persisted?.templates[initialTemplate]?.target ?? "og";
  });

  const [previewSrc, setPreviewSrc] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildUrl = useCallback((tmpl: TemplateName, p: Record<string, string>, t: TargetKey) => {
    const base      = `${env.deploymentURL}${OG_ROUTES[tmpl]}`;
    const allParams = { ...p, ...(t !== "og" ? { target: t as string } : {}) } as Record<string, string>;
    const query     = new URLSearchParams(Object.entries(allParams).filter(([, v]) => v !== ""));
    return query.size > 0 ? `${base}?${query.toString()}` : base;
  }, []);

  const ogUrl = useMemo(() => buildUrl(template, params, target), [buildUrl, template, params, target]);

  // Debounce preview at 150 ms
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setPreviewSrc(ogUrl), 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [ogUrl]);

  // Sync template into URL for shareable links
  useEffect(() => {
    router.replace(`${pathname}?template=${encodeURIComponent(template)}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, pathname, router]);

  // Persist current template slot whenever params / target change
  useEffect(() => {
    const prev = load() ?? { current: template, templates: {} };
    save({
      current: template,
      templates: {
        ...prev.templates,
        [template]: { params, target },
      },
    });
  }, [template, params, target]);

  const setTemplate = (t: TemplateName) => {
    // Restore the saved slot for the new template (if any)
    const persisted = load();
    const slot = persisted?.templates[t];
    setTemplateRaw(t);
    setParams(slot?.params ?? {});
    setTargetRaw(slot?.target ?? "og");
  };

  const setParam = useCallback((key: string, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setTarget = (t: TargetKey) => setTargetRaw(t);

  const resetParams = useCallback(() => {
    // Collect all valid keys for current template to ensure we only clear template-specific fields
    const keys = TEMPLATE_SECTIONS[template].flatMap((s) => s.fields.map((f) => f.key));
    setParams((prev) => {
      const next = { ...prev };
      for (const k of keys) delete next[k];
      return next;
    });
  }, [template]);

  return { template, params, target, previewSrc, ogUrl, setTemplate, setParam, setTarget, resetParams };
}
