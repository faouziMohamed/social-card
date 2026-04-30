"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils/cn";
import { TEMPLATE_SECTIONS } from "@/modules/og/shared/og-template-registry";
import type { TemplateName } from "@/modules/og/shared/og.types";
import type { FieldDef } from "@/modules/og/shared/og-template-registry";

interface BuilderFormProps {
  template:      TemplateName;
  params:        Record<string, string>;
  onParamChange: (key: string, value: string) => void;
}

// Receives key={template} from parent — remounts on template switch, resetting section state.
export function BuilderForm({ template, params, onParamChange }: BuilderFormProps) {
  const sections = TEMPLATE_SECTIONS[template];

  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set(sections.map((s) => s.title)),
  );

  const toggleSection = (title: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) { next.delete(title); } else { next.add(title); }
      return next;
    });
  };

  return (
    <div className="flex flex-col py-1">
      {sections.map((section, si) => {
        const open = openSections.has(section.title);
        return (
          <div key={section.title} className="flex flex-col">
            <button
              type="button"
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between px-3 py-2 text-left hover:bg-white/[0.03] transition-colors rounded"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-fg/60">
                {section.title}
              </span>
              <span className={cn("text-muted-fg/30 text-[10px] transition-transform duration-150", open ? "" : "-rotate-90")}>
                ▾
              </span>
            </button>
            {open && (
              <div className="flex flex-col pb-1.5">
                {section.fields.map((field) => (
                  <FieldRow
                    key={field.key}
                    field={field}
                    params={params}
                    onChange={(val) => onParamChange(field.key, val)}
                    onParamChange={onParamChange}
                  />
                ))}
              </div>
            )}
            {si < sections.length - 1 && (
              <hr className="mx-3 my-0.5 border-0 border-t border-border/30" />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Field renderer ────────────────────────────────────────────────────────────

function FieldRow({
  field,
  params,
  onChange,
  onParamChange,
}: {
  field: FieldDef;
  params: Record<string, string>;
  onChange: (v: string) => void;
  onParamChange: (key: string, value: string) => void;
}) {
  const value = params[field.key] ?? "";

  if (field.key === "bgCustomColor" && params.bgTone !== "custom") {
    return null;
  }

  if (field.key === "bgBase" && field.type === "select") {
    const { base, overlays } = parseBgStyle(params.bgStyle ?? "gradient+grid");
    return (
      <div className="flex items-center gap-2.5 px-3 py-1.5">
        <span className="w-20 shrink-0 text-xs text-muted-fg/70 font-medium leading-none">{field.label}</span>
        <Select
          value={base}
          onChange={(e) => onParamChange("bgStyle", serializeBgStyle(e.target.value, overlays))}
          className="h-6 flex-1 text-xs bg-transparent py-0"
        >
          {field.options.map((opt) => {
            const optValue = typeof opt === "string" ? opt : opt.value;
            const optLabel = typeof opt === "string" ? opt : opt.label;
            return <option key={optValue} value={optValue}>{optLabel}</option>;
          })}
        </Select>
      </div>
    );
  }

  if (field.key === "bgOverlays" && field.type === "multi-select") {
    const { base, overlays } = parseBgStyle(params.bgStyle ?? "gradient+grid");
    return (
      <div className="flex items-start gap-2.5 px-3 py-1.5">
        <span className="w-20 shrink-0 pt-1 text-xs text-muted-fg/70 font-medium leading-none">{field.label}</span>
        <div className="flex flex-wrap gap-1.5">
          {field.options.map((opt) => {
            const optValue = typeof opt === "string" ? opt : opt.value;
            const optLabel = typeof opt === "string" ? opt : opt.label;
            const active = overlays.includes(optValue);
            return (
              <button
                key={optValue}
                type="button"
                onClick={() => {
                  const next = active ? overlays.filter((v) => v !== optValue) : [...overlays, optValue];
                  onParamChange("bgStyle", serializeBgStyle(base, next));
                }}
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-mono transition-colors",
                  active
                    ? "border-primary/70 bg-primary/10 text-primary"
                    : "border-border/50 text-muted-fg hover:border-border",
                )}
              >
                {optLabel}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === "color") {
    return (
      <div className="flex items-center gap-2.5 px-3 py-1.5 group">
        <span className="w-20 shrink-0 text-xs text-muted-fg/70 font-medium leading-none">{field.label}</span>
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <label
            className="relative h-6 w-6 shrink-0 cursor-pointer rounded border border-white/15 shadow-sm transition-transform hover:scale-110 active:scale-95"
            style={{ backgroundColor: value || "#6366f1" }}
          >
            <input
              type="color"
              value={value || "#6366f1"}
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 cursor-pointer opacity-0 h-full w-full"
            />
          </label>
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#6366f1"
            className="h-6 flex-1 min-w-0 font-mono text-[11px] bg-transparent px-2"
          />
        </div>
      </div>
    );
  }

  if (field.type === "multi-select") {
    return null;
  }

  if (field.type === "select") {
    const firstOption = field.options[0];
    const defaultValue = typeof firstOption === "string" ? firstOption : firstOption.value;
    return (
      <div className="flex items-center gap-2.5 px-3 py-1.5">
        <span className="w-20 shrink-0 text-xs text-muted-fg/70 font-medium leading-none">{field.label}</span>
        <Select
          value={value || defaultValue}
          onChange={(e) => onChange(e.target.value)}
          className="h-6 flex-1 text-xs bg-transparent py-0"
        >
          {field.options.map((opt) => {
            const optValue = typeof opt === "string" ? opt : opt.value;
            const optLabel = typeof opt === "string" ? opt : opt.label;
            return <option key={optValue} value={optValue}>{optLabel}</option>;
          })}
        </Select>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 px-3 py-1.5">
      <span className="w-20 shrink-0 text-xs text-muted-fg/70 font-medium leading-none">{field.label}</span>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"placeholder" in field ? field.placeholder : ""}
        className="h-6 flex-1 text-xs bg-transparent px-2"
      />
    </div>
  );
}

function parseBgStyle(value: string): { base: string; overlays: string[] } {
  const tokens = value.split("+").map((v) => v.trim()).filter(Boolean);
  const bases = new Set(["solid", "gradient", "aurora", "mesh"]);
  const overlays = new Set(["grid", "dots", "diagonal", "noise", "spotlight", "vignette"]);
  const base = tokens.find((token) => bases.has(token)) ?? "gradient";
  return { base, overlays: tokens.filter((token) => overlays.has(token)) };
}

function serializeBgStyle(base: string, overlays: string[]): string {
  return [base, ...overlays].join("+");
}
