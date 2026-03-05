import { useEffect, useState } from "react";

export default function QueryCard({
  question,
  setQuestion,
  queryLoading,
  queryError,
  onAsk,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_20px_60px_-28px_rgba(76,110,245,0.45)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_80px_-28px_rgba(114,92,255,0.55)] ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <h2 className="text-base font-semibold text-white">Knowledge Query</h2>
      <p className="mt-1.5 text-sm text-slate-300">
        Ask a focused question to retrieve trust-aware evidence.
      </p>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={6}
        placeholder="Example: Summarize key claims and reliability with supporting evidence."
        className="mt-5 w-full resize-none rounded-xl border border-white/15 bg-slate-950/45 px-3.5 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-400/35"
      />

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-400">Response includes confidence + citations.</span>
        <button
          type="button"
          onClick={onAsk}
          disabled={queryLoading}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(76,110,245,0.45)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(139,92,246,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {queryLoading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          )}
          {queryLoading ? "Fetching..." : "Ask"}
        </button>
      </div>

      <div className="mt-3 min-h-5">
        {queryError && <p className="text-sm text-red-300">{queryError}</p>}
      </div>
    </section>
  );
}