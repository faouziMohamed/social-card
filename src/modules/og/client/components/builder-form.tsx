"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
    <div className="flex flex-col divide-y divide-border/20">
      {sections.map((section) => {
        const open = openSections.has(section.title);
        // Count filled fields for badge
        const filled = section.fields.filter((f) => params[f.key]?.trim()).length;

        return (
          <div key={section.title} className="flex flex-col">
            {/* Section header */}
            <Button
              variant="ghost"
              onClick={() => toggleSection(section.title)}
              className="flex h-auto w-full items-center justify-between rounded-none px-5 py-3.5 text-left hover:bg-white/[0.025]"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-fg/55">
                  {section.title}
                </span>
                {filled > 0 && (
                  <span className="rounded-full bg-primary/15 px-1.5 py-px text-[9px] font-bold tabular-nums text-primary/80">
                    {filled}
                  </span>
                )}
              </div>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-muted-fg/35 transition-transform duration-200",
                  open ? "rotate-0" : "-rotate-90",
                )}
              />
            </Button>

            {/* Fields */}
            {open && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 px-5 pb-5 pt-2">
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
          </div>
        );
      })}
    </div>
  );
}

// ─── Field renderer ─────────────────────────────────────────────────────────

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

  if (field.key === "bgCustomColor" && params.bgTone !== "custom") return null;

  // ── BG base select (special: writes to bgStyle) ──────────────────────────
  if (field.key === "bgBase" && field.type === "select") {
    const { base, overlays } = parseBgStyle(params.bgStyle ?? "gradient+grid");
    return (
      <FieldWrap label={field.label}>
        <Select
          value={base}
          onValueChange={(v) => onParamChange("bgStyle", serializeBgStyle(v, overlays))}
        >
          <SelectTrigger className="h-9 w-full text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((opt) => {
              const v = typeof opt === "string" ? opt : opt.value;
              const l = typeof opt === "string" ? opt : opt.label;
              return <SelectItem key={v} value={v}>{l}</SelectItem>;
            })}
          </SelectContent>
        </Select>
      </FieldWrap>
    );
  }

  // ── BG overlays multi-toggle (full width) ────────────────────────────────
  if (field.key === "bgOverlays" && field.type === "multi-select") {
    const { base, overlays } = parseBgStyle(params.bgStyle ?? "gradient+grid");
    return (
      <div className="col-span-2 flex flex-col gap-2 py-1">
        <span className="text-[11px] font-medium text-muted-fg/65">{field.label}</span>
        <div className="flex flex-wrap gap-1.5">
          {field.options.map((opt) => {
            const optValue = typeof opt === "string" ? opt : opt.value;
            const optLabel = typeof opt === "string" ? opt : opt.label;
            const active = overlays.includes(optValue);
            return (
              <Button
                key={optValue}
                variant="outline"
                onClick={() => {
                  const next = active
                    ? overlays.filter((v) => v !== optValue)
                    : [...overlays, optValue];
                  onParamChange("bgStyle", serializeBgStyle(base, next));
                }}
                className={cn(
                  "h-7 rounded-full px-3 text-[11px] font-mono transition-all duration-150",
                  active
                    ? "border-primary/60 bg-primary/10 text-primary hover:bg-primary/15"
                    : "border-border/50 text-muted-fg/70 hover:border-border hover:text-foreground",
                )}
              >
                {optLabel}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Color picker (full width — swatch + hex input need horizontal space) ─
  if (field.type === "color") {
    return (
      <div className="col-span-2 flex flex-col gap-1.5 py-1">
        <span className="text-[11px] font-medium text-muted-fg/65">{field.label}</span>
        <div className="flex items-center gap-2.5">
          <label
            className="group relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-border/50 shadow-sm transition-all hover:scale-105 hover:shadow-md active:scale-95"
            style={{ backgroundColor: value || "#6366f1" }}
          >
            <input
              type="color"
              value={value || "#6366f1"}
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
            <div className="absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/10" />
          </label>
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#6366f1"
            className="h-9 flex-1 font-mono text-xs tracking-wide"
          />
        </div>
      </div>
    );
  }

  if (field.type === "multi-select") return null;

  // ── Radix Select ─────────────────────────────────────────────────────────
  if (field.type === "select") {
    const firstOption = field.options[0];
    const defaultValue = typeof firstOption === "string" ? firstOption : firstOption.value;
    return (
      <FieldWrap label={field.label}>
        <Select value={value || defaultValue} onValueChange={onChange}>
          <SelectTrigger className="h-9 w-full text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((opt) => {
              const v = typeof opt === "string" ? opt : opt.value;
              const l = typeof opt === "string" ? opt : opt.label;
              return <SelectItem key={v} value={v}>{l}</SelectItem>;
            })}
          </SelectContent>
        </Select>
      </FieldWrap>
    );
  }

  // ── Date picker (full width — formatted date needs space) ────────────────
  if (field.type === "date") {
    const parsed = value ? parseISO(value) : undefined;
    return (
      <div className="col-span-2 flex flex-col gap-1.5 py-1">
        <span className="text-[11px] font-medium text-muted-fg/65">{field.label}</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-9 w-full justify-start gap-2 px-3 text-xs font-normal",
                !value && "text-muted-fg/50",
              )}
            >
              <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-muted-fg/60" />
              {parsed ? format(parsed, "PPP") : "Pick a date…"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={parsed}
              onSelect={(day) => onChange(day ? format(day, "yyyy-MM-dd") : "")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  // ── Text / URL input ─────────────────────────────────────────────────────
  return (
    <FieldWrap label={field.label}>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"placeholder" in field ? field.placeholder : ""}
        className="h-9 w-full text-xs"
      />
    </FieldWrap>
  );
}

// ─── Shared field wrapper — stacked label above input ───────────────────────

function FieldWrap({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 py-1">
      <span className="text-[11px] font-medium leading-tight text-muted-fg/65">
        {label}
      </span>
      {children}
    </div>
  );
}

// ─── BG style helpers ────────────────────────────────────────────────────────

function parseBgStyle(value: string): { base: string; overlays: string[] } {
  const tokens  = value.split("+").map((v) => v.trim()).filter(Boolean);
  const bases   = new Set(["solid", "gradient", "aurora", "mesh"]);
  const overlays = new Set(["grid", "dots", "diagonal", "noise", "spotlight", "vignette"]);
  const base    = tokens.find((t) => bases.has(t)) ?? "gradient";
  return { base, overlays: tokens.filter((t) => overlays.has(t)) };
}

function serializeBgStyle(base: string, overlays: string[]): string {
  return [base, ...overlays].join("+");
}
