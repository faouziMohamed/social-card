import {Button} from '@/components/ui/button';

export function Section({
  title,
  count,
  collapsed,
  onToggle,
}: {
  title: string;
  count: number;
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h2 className="font-bold uppercase tracking-widest text-sm text-muted-fg">
          {title}
        </h2>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-mono text-primary">
          {count}
        </span>
      </div>
      <Button size="sm" variant="outline" onClick={onToggle}>
        {collapsed ? 'Show examples' : 'Hide details'}
      </Button>
    </div>
  );
}
