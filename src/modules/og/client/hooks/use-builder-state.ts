"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { OG_ROUTES } from "@/modules/og/shared/og-routes";
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
}

export function useBuilderState(): BuilderState {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const [template, setTemplateRaw] = useState<TemplateName>(
    (searchParams.get("template") as TemplateName) ?? "general",
  );
  const [params, setParams]   = useState<Record<string, string>>({});
  const [target, setTargetRaw] = useState<TargetKey>("og");
  const [previewSrc, setPreviewSrc] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildUrl = useCallback((tmpl: TemplateName, p: Record<string, string>, t: TargetKey) => {
    const base       = `${env.deploymentURL}${OG_ROUTES[tmpl]}`;
    const allParams  = { ...p, ...(t !== "og" ? { target: t as string } : {}) } as Record<string, string>;
    const query      = new URLSearchParams(Object.entries(allParams).filter(([, v]) => v !== ""));
    return query.size > 0 ? `${base}?${query.toString()}` : base;
  }, []);

  const ogUrl = useMemo(() => buildUrl(template, params, target), [buildUrl, template, params, target]);

  // Debounce preview at 150 ms — instant feel without hammering the edge API
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setPreviewSrc(ogUrl), 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [ogUrl]);

  // Sync template into URL for shareable links.
  // Intentionally excludes searchParams from deps — reading it here creates a feedback
  // loop: router.replace updates searchParams → effect re-runs → router.replace again.
  useEffect(() => {
    router.replace(`${pathname}?template=${encodeURIComponent(template)}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, pathname, router]);

  const setTemplate = (t: TemplateName) => {
    setTemplateRaw(t);
    setParams({});
    setTargetRaw("og");
  };

  const setParam = useCallback((key: string, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setTarget = (t: TargetKey) => setTargetRaw(t);

  return { template, params, target, previewSrc, ogUrl, setTemplate, setParam, setTarget };
}
