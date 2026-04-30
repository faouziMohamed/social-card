"use client";

import { cn } from "@/lib/utils/cn";
import { TEMPLATE_META } from "@/modules/og/shared/og-template-registry";
import type { TemplateName } from "@/modules/og/shared/og.types";

interface TemplateSelectorProps {
  value:    TemplateName;
  onChange: (t: TemplateName) => void;
}

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-0.5 px-0.5">
      {TEMPLATE_META.map(({ name, label, desc, color, icon }) => {
        const active = value === name;
        return (
          <button
            type="button"
            key={name}
            onClick={() => onChange(name)}
            className={cn(
              "group relative flex-shrink-0 flex flex-col gap-2 rounded-xl border px-3.5 py-3 text-left transition-all duration-200 w-[128px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
              active
                ? "bg-card shadow-xl"
                : "border-border/60 bg-card/40 hover:bg-card/70 hover:border-border",
            )}
            style={{
              borderColor: active ? `${color}60` : undefined,
              boxShadow:   active ? `0 0 0 1px ${color}30, 0 8px 24px ${color}15` : undefined,
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-xl transition-opacity duration-200" style={{ background: `linear-gradient(90deg, ${color}00, ${color}, ${color}00)`, opacity: active ? 1 : 0 }} />
            <span className="text-xl leading-none transition-transform duration-200 group-hover:scale-110" style={{ color: active ? color : undefined }}>
              {icon}
            </span>
            <div>
              <p className={cn("text-xs font-semibold leading-tight", active ? "text-foreground" : "text-muted-fg")}>{label}</p>
              <p className="mt-0.5 text-[10px] leading-tight text-muted-fg/60 line-clamp-1">{desc}</p>
            </div>
            {active && (
              <span className="absolute bottom-2.5 right-2.5 h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
