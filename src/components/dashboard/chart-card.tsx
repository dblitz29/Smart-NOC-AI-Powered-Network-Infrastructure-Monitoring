/** The title is the question the chart answers. */
export function ChartCard({ title, note, className = "", height = "h-64", children }: { title: string; note: string; className?: string; height?: string; children: React.ReactNode }) {
  return (
    <section className={`rounded-lg border border-border bg-card p-4 ${className}`}>
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>
      <div className={`mt-4 ${height}`}>{children}</div>
    </section>
  );
}
