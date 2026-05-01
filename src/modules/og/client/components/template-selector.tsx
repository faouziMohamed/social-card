'use client';

import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils/cn';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';

export interface TemplateSelectorMeta {
  name: string;
  label: string;
  desc: string;
  color: string;
  icon: string;
}

interface TemplateSelectorProps {
  meta: TemplateSelectorMeta[];
  value: string;
  onChange: (t: string) => void;
}

export function TemplateSelector({
  meta,
  value,
  onChange,
}: TemplateSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, {passive: true});
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>("[data-active='true']");
    active?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [value]);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({left: dir === 'left' ? -280 : 280, behavior: 'smooth'});
  };

  return (
    <div className="relative w-full">
      {/* Left fade + nav */}
      <div
        className={cn(
          'pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent transition-opacity duration-200',
          canScrollLeft ? 'opacity-100' : 'opacity-0',
        )}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => scroll('left')}
        className={cn(
          'absolute left-1 top-1/2 z-20 -translate-y-1/2 h-8 w-8 rounded-full border border-border/40 bg-card/80 shadow-md backdrop-blur-sm transition-all duration-200',
          canScrollLeft
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Scrollable card strip */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth px-2 py-3 scrollbar-hide snap-x snap-mandatory"
      >
        {meta.map(({name, label, desc, color, icon}) => {
          const active = value === name;
          return (
            <button
              key={name}
              type="button"
              data-active={active}
              onClick={() => onChange(name)}
              className={cn(
                'group relative flex snap-start flex-col gap-3 rounded-2xl border p-4 text-left',
                'w-[160px] min-w-[160px] shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                'transition-all duration-300',
                active
                  ? 'border-transparent bg-card shadow-2xl scale-[1.03]'
                  : 'border-border/40 bg-card/30 hover:bg-card/70 hover:scale-[1.015] hover:border-border/70',
              )}
              style={{
                boxShadow: active
                  ? `0 0 0 1.5px ${color}55, 0 12px 32px ${color}20`
                  : undefined,
              }}
            >
              {/* Gradient preview thumbnail */}
              <div
                className="relative h-[72px] w-full overflow-hidden rounded-lg"
                style={{
                  background: active
                    ? `linear-gradient(135deg, ${color}30 0%, ${color}08 100%)`
                    : `linear-gradient(135deg, ${color}18 0%, ${color}04 100%)`,
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-center gap-1.5 px-3 py-2">
                  <div
                    className="h-[3px] w-1/3 rounded-full opacity-60"
                    style={{background: color}}
                  />
                  <div
                    className="h-[6px] w-3/4 rounded-sm opacity-40"
                    style={{background: color}}
                  />
                  <div
                    className="h-[4px] w-1/2 rounded-sm opacity-25"
                    style={{background: color}}
                  />
                  <div
                    className="mt-1 h-[3px] w-1/4 rounded-full opacity-20"
                    style={{background: color}}
                  />
                </div>
                <span
                  className="absolute right-2.5 bottom-1.5 text-[22px] leading-none opacity-30 transition-opacity duration-200 group-hover:opacity-50"
                  style={{color}}
                >
                  {icon}
                </span>
                <div
                  className="absolute inset-x-0 top-0 h-[3px] rounded-t-lg transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    opacity: active ? 1 : 0,
                  }}
                />
              </div>

              {/* Label + description */}
              <div className="flex flex-col gap-0.5">
                <p
                  className={cn(
                    'text-[13px] font-semibold leading-tight tracking-tight transition-colors duration-200',
                    active
                      ? 'text-foreground'
                      : 'text-muted-fg group-hover:text-foreground',
                  )}
                >
                  {label}
                </p>
                <p className="line-clamp-2 text-[10px] leading-snug text-muted-fg/55">
                  {desc}
                </p>
              </div>

              {active && (
                <span
                  className="absolute bottom-3 right-3 h-1.5 w-1.5 rounded-full"
                  style={{background: color, boxShadow: `0 0 8px ${color}`}}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Right fade + nav */}
      <div
        className={cn(
          'pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent transition-opacity duration-200',
          canScrollRight ? 'opacity-100' : 'opacity-0',
        )}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => scroll('right')}
        className={cn(
          'absolute right-1 top-1/2 z-20 -translate-y-1/2 h-8 w-8 rounded-full border border-border/40 bg-card/80 shadow-md backdrop-blur-sm transition-all duration-200',
          canScrollRight
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-1 pb-1">
        {meta.map(({name, color}) => (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            className="transition-all duration-300 rounded-full focus:outline-none"
            style={{
              width: value === name ? 16 : 5,
              height: 5,
              background: value === name ? color : 'oklch(0.45 0.01 250)',
              opacity: value === name ? 1 : 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
