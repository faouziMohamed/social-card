'use client';

import {cn} from '@/lib/utils/cn';

export function FieldShell({
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
