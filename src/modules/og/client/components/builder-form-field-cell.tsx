'use client';

import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Input} from '@/components/ui/input';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {cn} from '@/lib/utils/cn';
import {FieldShell} from '@/modules/og/client/components/builder-field-shell';
import {
  parseBgStyle,
  serializeBgStyle,
} from '@/modules/og/client/components/builder-form.utils';
import {FONT_FAMILY_GROUPS} from '@/modules/og/shared/og-font-catalog';
import type {FieldDef} from '@/modules/og/shared/og-template-registry';
import {format, parseISO} from 'date-fns';
import {CalendarIcon} from 'lucide-react';

export function FieldCell({
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

  if (field.key === 'schemaType' && field.type === 'text') {
    const presetOptions = (field.options ?? []).map(opt =>
      typeof opt === 'string' ? opt : opt.value,
    );
    const selectedValue = presetOptions.includes(value) ? value : '__custom__';
    return (
      <div className="col-span-2 flex flex-col gap-1.5">
        <span className="text-[10px] font-medium text-muted-fg/50">
          {field.label}
        </span>
        <Select
          value={selectedValue || '__custom__'}
          onValueChange={next => {
            if (next === '__custom__') return;
            onChange(next);
          }}
        >
          <SelectTrigger className="h-8 w-full text-xs">
            <SelectValue placeholder="Pick schema type" />
          </SelectTrigger>
          <SelectContent>
            {presetOptions.map(opt => (
              <SelectItem key={opt} value={opt} className="text-xs">
                {opt}
              </SelectItem>
            ))}
            <SelectItem value="__custom__" className="text-xs">
              Custom
            </SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={'placeholder' in field ? field.placeholder : ''}
          className="h-8 w-full text-xs"
        />
      </div>
    );
  }

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
            {field.key === 'fontFamily'
              ? FONT_FAMILY_GROUPS.map(group => (
                  <SelectGroup key={group.key}>
                    <SelectLabel>{group.label}</SelectLabel>
                    {group.options.map(font => (
                      <SelectItem
                        key={font.value}
                        value={font.value}
                        className="text-xs"
                      >
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))
              : field.options.map(opt => {
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
              {parsed ? format(parsed, 'PPP') : 'Pick a date...'}
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
