function barColor(score) {
  if (score >= 75) return "from-emerald-400 to-emerald-600 shadow-[0_0_22px_rgba(16,185,129,0.45)]";
  if (score >= 45) return "from-amber-300 to-amber-500 shadow-[0_0_22px_rgba(245,158,11,0.4)]";
  return "from-red-400 to-red-600 shadow-[0_0_22px_rgba(239,68,68,0.45)]";
}

export default function ConfidenceBar({ score = 0 }) {
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-500">
        <span>0%</span>
        <span>100%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800/90 ring-1 ring-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r transition-all duration-500 ${barColor(
            safeScore
          )}`}
          style={{ width: `${safeScore}%` }}
        />
      </div>
      <p className="mt-1.5 text-right text-xs font-semibold text-slate-300">{safeScore}%</p>
    </div>
  );
}