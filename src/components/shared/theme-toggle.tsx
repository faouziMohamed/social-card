'use client';

import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils/cn';
import {Check, ChevronDown, Monitor, Moon, Sun} from 'lucide-react';
import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';

const THEMES = [
  {value: 'dark', label: 'Night Vision', Icon: Moon},
  {value: 'light', label: 'High Visibility', Icon: Sun},
  {value: 'system', label: 'Auto Detect', Icon: Monitor},
] as const;

type ThemeValue = (typeof THEMES)[number]['value'];

export function ThemeToggle() {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  // Hydration guard — intentional setState in effect
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span aria-hidden className="inline-flex h-9 w-9 opacity-0" />;
  }

  const activeTheme = (theme ?? 'system') as ThemeValue;
  const current = THEMES.find(t => t.value === activeTheme) ?? THEMES[2];
  const CurrentIcon = current.Icon;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Theme menu"
          title={current.label}
          className="gap-1.5 px-2"
        >
          <CurrentIcon className="h-4 w-4" />
          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-44 p-1">
        <div className="flex flex-col gap-0.5">
          {THEMES.map(({value, label, Icon}) => {
            const active = activeTheme === value;

            return (
              <Button
                key={value}
                variant="ghost"
                size="sm"
                onClick={() => {
                  setTheme(value);
                  setOpen(false);
                }}
                className={cn(
                  'h-8 w-full justify-start gap-2 px-2 text-xs',
                  active && 'text-primary',
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="flex-1 text-left">{label}</span>
                {active && <Check className="h-3.5 w-3.5" />}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
