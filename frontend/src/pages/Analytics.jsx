import SidebarLayout from "../components/SidebarLayout";

function getHistory() {
  try {
    const raw = localStorage.getItem("tkis_query_history");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getDocsIndexed() {
  try {
    return Number(localStorage.getItem("tkis_docs_indexed") || "0");
  } catch {
    return 0;
  }
}

export default function Analytics() {
  const history = getHistory();
  const docsIndexed = getDocsIndexed();

  const totalQueries = history.length;
  const avgConfidence =
    totalQueries === 0
      ? 0
      : Math.round(
          history.reduce((acc, cur) => acc + (Number(cur.confidence_score) || 0), 0) / totalQueries
        );

  const chartData = history.slice(0, 7).reverse();

  return (
    <SidebarLayout
      title="Analytics"
      subtitle="High-level usage and confidence quality across your query pipeline."
    >
      <section className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-wider text-slate-400">Total Queries</p>
            <p className="mt-2 text-3xl font-bold text-white">{totalQueries}</p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-wider text-slate-400">Avg Confidence</p>
            <p className="mt-2 text-3xl font-bold text-cyan-300">{avgConfidence}%</p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-wider text-slate-400">Documents Indexed</p>
            <p className="mt-2 text-3xl font-bold text-violet-300">{docsIndexed}</p>
          </article>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="mb-4 text-sm font-medium text-slate-200">Recent Confidence Trend</p>
          {chartData.length === 0 ? (
            <p className="text-sm text-slate-300">No analytics yet. Run some queries first.</p>
          ) : (
            <div className="flex h-44 items-end gap-3">
              {chartData.map((item, idx) => {
                const value = Math.max(0, Math.min(100, Number(item.confidence_score) || 0));
                return (
                  <div key={`${item.timestamp}-${idx}`} className="flex flex-1 flex-col items-center gap-2">
                    <div className="relative flex h-36 w-full items-end rounded-md bg-slate-900/70">
                      <div
                        className="w-full rounded-md bg-gradient-to-t from-blue-500 to-violet-500"
                        style={{ height: `${value}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">{value}%</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SidebarLayout>
  );
}