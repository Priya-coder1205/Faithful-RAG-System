import SidebarLayout from "../components/SidebarLayout";

function getHistory() {
  try {
    const raw = localStorage.getItem("tkis_query_history");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function badgeClass(level) {
  const v = String(level || "").toUpperCase();
  if (v === "HIGH") return "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-300/40";
  if (v === "MEDIUM") return "bg-amber-500/20 text-amber-200 ring-1 ring-amber-300/40";
  return "bg-red-500/20 text-red-200 ring-1 ring-red-300/40";
}

export default function History() {
  const entries = getHistory();

  return (
    <SidebarLayout
      title="Query History"
      subtitle="Review previous questions with confidence and timestamps."
    >
      <section className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        {entries.length === 0 ? (
          <p className="text-sm text-slate-300">No previous queries yet.</p>
        ) : (
          <ul className="space-y-3">
            {entries.map((item, idx) => (
              <li
                key={`${item.timestamp}-${idx}`}
                className="rounded-xl border border-white/10 bg-slate-950/40 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="text-sm text-slate-100">{item.question}</p>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass(item.confidence_level)}`}>
                    {String(item.confidence_level || "UNKNOWN").toUpperCase()} ({item.confidence_score ?? 0}%)
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  {item.timestamp ? new Date(item.timestamp).toLocaleString() : "Unknown time"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </SidebarLayout>
  );
}