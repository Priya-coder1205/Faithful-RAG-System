export default function MetricRing({ label, value, note, accent = "#8b5cf6" }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safeValue / 100) * circumference;

  return (
    <article className="glass-panel shine-border rounded-[24px] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_rgba(99,102,241,0.7)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-300">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-white text-glow">
            {safeValue}%
          </p>
          {note && <p className="mt-2 text-sm text-slate-400">{note}</p>}
        </div>

        <div className="relative h-28 w-28 shrink-0">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(148,163,184,0.14)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={accent}
              strokeLinecap="round"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ filter: `drop-shadow(0 0 12px ${accent}88)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold text-white">{safeValue}</span>
            <span className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Score</span>
          </div>
        </div>
      </div>
    </article>
  );
}
