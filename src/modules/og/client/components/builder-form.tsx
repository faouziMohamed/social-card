'use client';

import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Input} from '@/components/ui/input';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {cn} from '@/lib/utils/cn';
import type {
  FieldDef,
  FormSection,
} from '@/modules/og/shared/og-template-registry';
import {format, parseISO} from 'date-fns';
import {CalendarIcon} from 'lucide-react';

export interface BuilderFormProps {
  sections: FormSection[];
  params: Record<string, string>;
  onParamChange: (key: string, value: string) => void;
}

// Returns true for fields that always occupy the full row (2 columns)
function isFullWidth(field: FieldDef): boolean {
  return (
    field.type === 'color' ||
    field.type === 'date' ||
    field.type === 'multi-select'
  );
}

// Returns true for the bgOverlays multi-toggle (always full width)
function isBgOverlays(field: FieldDef): boolean {
  return field.key === 'bgOverlays';
}

/**
 * Given a list of visible fields, compute which half-width fields need
 * col-span-2 because they'd be alone on their row.
 */
function computeFullWidthSet(fields: FieldDef[]): Set<string> {
  const result = new Set<string>();
  let col = 0;

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (isFullWidth(field) || isBgOverlays(field)) {
      col = 0;
      continue;
    }
    if (col === 0) {
      const immediateNext = fields[i + 1];
      const partnerExists =
        immediateNext &&
        !isFullWidth(immediateNext) &&
        !isBgOverlays(immediateNext);
      if (!partnerExists) {
        result.add(field.key);
        col = 0;
      } else {
        col = 1;
      }
    } else {
      col = 0;
    }
  }

  return result;
}

// key={template} from parent — remounts on template switch to reset scroll position
export function BuilderForm({
  sections,
  params,
  onParamChange,
}: BuilderFormProps) {
  return (
    <div className="flex flex-col divide-y divide-border/20">
      {sections.map(section => {
        const visibleFields = section.fields.filter(f => {
          if (f.key === 'bgCustomColor' && params.bgTone !== 'custom')
            return false;
          const {base} = parseBgStyle(params.bgStyle ?? 'gradient+grid');
          if (
            (f.key === 'bgGradientFrom' || f.key === 'bgGradientTo') &&
            base !== 'gradient'
          )
            return false;
          return true;
        });

        if (visibleFields.length === 0) return null;

        const forceFullWidth = computeFullWidthSet(visibleFields);

        return (
          <div key={section.title}>
            <div className="sticky top-0 z-10 border-b border-border/20 bg-card/90 px-4 py-2 backdrop-blur-sm">
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-muted-fg/40">
                {section.title}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-3 px-4 py-3">
              {visibleFields.map(field => (
                <FieldCell
                  key={field.key}
                  field={field}
                  params={params}
                  forceFullWidth={forceFullWidth.has(field.key)}
                  onChange={val => onParamChange(field.key, val)}
                  onParamChange={onParamChange}
                />
              ))}
            </div>
          </div>
        );
      })}

      <div className="h-2" />
    </div>
  );
}

// ─── Field cell ──────────────────────────────────────────────────────────────

function FieldCell({
  field,
  params,
  forceFullWidth,
  onChange,
  onParamChange,
}: {
  field: FieldDef;
  params: Record<string, string>;
  forceFullWidth: boolean;
  onChange: (v: string) => void;
  onParamChange: (key: string, value: string) => void;
}) {
  const value = params[field.key] ?? '';

  if (field.key === 'bgBase' && field.type === 'select') {
    const {base, overlays} = parseBgStyle(params.bgStyle ?? 'gradient+grid');
    return (
      <FieldShell label={field.label} fullWidth={forceFullWidth}>
        <Select
          value={base}
          onValueChange={v =>
            onParamChange('bgStyle', serializeBgStyle(v, overlays))
          }
        >
          <SelectTrigger className="h-8 w-full text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {field.options.map(opt => {
              const v = typeof opt === 'string' ? opt : opt.value;
              const l = typeof opt === 'string' ? opt : opt.label;
              return (
                <SelectItem key={v} value={v} className="text-xs">
                  {l}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </FieldShell>
    );
  }

  if (field.key === 'bgOverlays' && field.type === 'multi-select') {
    const {base, overlays} = parseBgStyle(params.bgStyle ?? 'gradient+grid');
    return (
      <div className="col-span-2 flex flex-col gap-2">
        <span className="text-[10px] font-medium text-muted-fg/50">
          {field.label}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {field.options.map(opt => {
            const v = typeof opt === 'string' ? opt : opt.value;
            const l = typeof opt === 'string' ? opt : opt.label;
            const active = overlays.includes(v);
            return (
              <button
                key={v}
                type="button"
                onClick={() => {
                  const next = active
                    ? overlays.filter(x => x !== v)
                    : [...overlays, v];
                  onParamChange('bgStyle', serializeBgStyle(base, next));
                }}
                className={cn(
                  'rounded-md border px-2.5 py-1 font-mono text-[10px] font-medium transition-all duration-100',
                  active
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border/40 bg-card/30 text-muted-fg/60 hover:border-border/70 hover:text-foreground',
                )}
              >
                {l}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === 'color') {
    const displayColor = value || '#6366f1';
    return (
      <div className="col-span-2 flex flex-col gap-1.5">
        <span className="text-[10px] font-medium text-muted-fg/50">
          {field.label}
        </span>
        <div className="flex h-8 items-center overflow-hidden rounded-lg border border-border/50 bg-card/40 pr-2.5 transition-colors focus-within:border-border/70">
          <label
            className="relative h-8 w-10 shrink-0 cursor-pointer transition-opacity hover:opacity-90"
            title="Pick color"
            style={{backgroundColor: displayColor}}
          >
            <input
              type="color"
              value={displayColor}
              onChange={e => onChange(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
          <div className="mx-2 h-4 w-px shrink-0 bg-border/40" />
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="#6366f1"
            maxLength={7}
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent font-mono text-[11px] text-foreground outline-none placeholder:text-muted-fg/30"
          />
        </div>
      </div>
    );
  }

  if (field.type === 'multi-select') return null;

  if (field.type === 'select') {
    const first = field.options[0];
    const defaultValue = typeof first === 'string' ? first : first.value;
    const selectedValue =
      field.key === 'icon' && value === '' ? '__none__' : value || defaultValue;

    const handleSelectValueChange = (nextValue: string) => {
      if (field.key === 'icon' && nextValue === '__none__') {
        onChange('');
        return;
      }
      onChange(nextValue);
    };

    return (
      <FieldShell label={field.label} fullWidth={forceFullWidth}>
        <Select value={selectedValue} onValueChange={handleSelectValueChange}>
          <SelectTrigger className="h-8 w-full text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {field.options.map(opt => {
              const v = typeof opt === 'string' ? opt : opt.value;
              const l = typeof opt === 'string' ? opt : opt.label;
              return (
                <SelectItem key={v} value={v} className="text-xs">
                  {l}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </FieldShell>
    );
  }

  if (field.type === 'date') {
    const parsed = value ? parseISO(value) : undefined;
    return (
      <div className="col-span-2 flex flex-col gap-1.5">
        <span className="text-[10px] font-medium text-muted-fg/50">
          {field.label}
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'h-8 w-full justify-start gap-2 px-3 text-xs font-normal',
                !value && 'text-muted-fg/40',
              )}
            >
              <CalendarIcon className="h-3 w-3 shrink-0 opacity-50" />
              {parsed ? format(parsed, 'PPP') : 'Pick a date…'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={parsed}
              onSelect={day => onChange(day ? format(day, 'yyyy-MM-dd') : '')}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <FieldShell label={field.label} fullWidth={forceFullWidth}>
      <Input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={'placeholder' in field ? field.placeholder : ''}
        className="h-8 w-full text-xs"
      />
    </FieldShell>
  );
}

// ─── Shared label+input wrapper ──────────────────────────────────────────────

function FieldShell({
  label,
  fullWidth,
  children,
}: {
  label: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'col-span-2')}>
      <span className="text-[10px] font-medium leading-tight text-muted-fg/50">
        {label}
      </span>
      {children}
    </div>
  );
}

// ─── BG style helpers ────────────────────────────────────────────────────────

function parseBgStyle(value: string): {base: string; overlays: string[]} {
  const tokens = value
    .split('+')
    .map(v => v.trim())
    .filter(Boolean);
  const bases = new Set(['solid', 'gradient', 'aurora', 'mesh']);
  const overlaySet = new Set([
    'grid',
    'dots',
    'diagonal',
    'noise',
    'spotlight',
    'vignette',
  ]);
  const base = tokens.find(t => bases.has(t)) ?? 'gradient';
  return {base, overlays: tokens.filter(t => overlaySet.has(t))};
}

function serializeBgStyle(base: string, overlays: string[]): string {
  return [base, ...overlays].join('+');
}
