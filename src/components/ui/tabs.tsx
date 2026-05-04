'use client';

import {cn} from '@/lib/utils/cn';
import * as React from 'react';

interface TabsContextValue {
  value: string;
  onValueChange: (v: string) => void;
}
const TabsContext = React.createContext<TabsContextValue>({
  value: '',
  onValueChange: () => {},
});

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
  className,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? '');
  const active = value ?? internal;
  const handleChange = (v: string) => {
    setInternal(v);
    onValueChange?.(v);
  };
  return (
    <TabsContext.Provider value={{value: active, onValueChange: handleChange}}>
      <div className={cn('flex flex-col', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-fg',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(TabsContext);
  const active = ctx.value === value;
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={() => ctx.onValueChange(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        active
          ? 'bg-card text-foreground shadow-sm'
          : 'text-muted-fg hover:text-foreground',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(TabsContext);
  if (ctx.value !== value) return null;
  return <div className={cn('mt-2', className)}>{children}</div>;
}
