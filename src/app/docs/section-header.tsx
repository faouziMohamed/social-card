export function SectionHeader({
  icon,
  title,
  subtitle,
  count,
  id,
}: {
  icon: string;
  title: string;
  subtitle: string;
  count: number;
  id: string;
}) {
  return (
    <div id={id} className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h2 className="font-bold uppercase tracking-widest text-sm text-muted-foreground">
          {title}
        </h2>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-mono text-primary">
          {count}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{subtitle}</p>
      <div className="section-divider" />
    </div>
  );
}
