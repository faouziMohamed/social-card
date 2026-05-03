'use client';

import {cn} from '@/lib/utils/cn';
import * as React from 'react';
import {createPortal} from 'react-dom';

type SheetContextValue = {
  open: boolean;
  setOpen: (next: boolean) => void;
};

const SheetContext = React.createContext<SheetContextValue | null>(null);

export interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Sheet({open, onOpenChange, children}: SheetProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : internalOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  return (
    <SheetContext.Provider value={{open: resolvedOpen, setOpen}}>
      {children}
    </SheetContext.Provider>
  );
}

interface SheetTriggerProps {
  asChild?: boolean;
  children: React.ReactElement;
}

export function SheetTrigger({asChild, children}: SheetTriggerProps) {
  const context = useSheetContext();

  if (asChild) {
    type P = Record<string, unknown> & {
      onClick?: (e: React.MouseEvent) => void;
    };
    const el = children as React.ReactElement<P>;
    return React.cloneElement(el, {
      ...el.props,
      onClick: (event: React.MouseEvent) => {
        el.props.onClick?.(event);
        if (!event.defaultPrevented) {
          context.setOpen(true);
        }
      },
    });
  }

  return children;
}

interface SheetCloseProps {
  asChild?: boolean;
  children: React.ReactElement;
}

export function SheetClose({asChild, children}: SheetCloseProps) {
  const context = useSheetContext();

  if (asChild) {
    type P = Record<string, unknown> & {
      onClick?: (e: React.MouseEvent) => void;
    };
    const el = children as React.ReactElement<P>;
    return React.cloneElement(el, {
      ...el.props,
      onClick: (event: React.MouseEvent) => {
        el.props.onClick?.(event);
        if (!event.defaultPrevented) {
          context.setOpen(false);
        }
      },
    });
  }

  return children;
}

type SheetSide = 'left' | 'right' | 'top' | 'bottom';

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: SheetSide;
}

export function SheetContent({
  side = 'right',
  className,
  children,
  ...props
}: SheetContentProps) {
  const context = useSheetContext();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Hydration guard — intentional setState in effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!context.open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        context.setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [context]);

  if (!mounted || !context.open) {
    return null;
  }

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => context.setOpen(false)}
      />
      <div
        className={cn(
          'fixed z-50 bg-card border-border shadow-2xl transition-all duration-200',
          side === 'right' &&
            'inset-y-0 right-0 h-full w-[88vw] max-w-sm border-l',
          side === 'left' &&
            'inset-y-0 left-0 h-full w-[88vw] max-w-sm border-r',
          side === 'top' && 'inset-x-0 top-0 w-full border-b',
          side === 'bottom' && 'inset-x-0 bottom-0 w-full border-t',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </>,
    document.body,
  );
}

export function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1.5 p-4 border-b border-border',
        className,
      )}
      {...props}
    />
  );
}

export function SheetTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-sm font-semibold', className)} {...props} />;
}

export function SheetDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-xs text-muted-fg', className)} {...props} />;
}

export function SheetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-2 p-4 border-t border-border',
        className,
      )}
      {...props}
    />
  );
}

function useSheetContext(): SheetContextValue {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error('Sheet components must be used inside <Sheet>');
  }
  return context;
}
