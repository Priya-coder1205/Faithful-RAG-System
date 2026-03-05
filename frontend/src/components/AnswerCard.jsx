import { useEffect, useState } from "react";
import ConfidenceBar from "./ConfidenceBar";
import ClaimList from "./ClaimList";

function levelStyles(level) {
  const normalized = String(level || "").toUpperCase();
  if (normalized === "HIGH") {
    return "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-300/50 shadow-[0_0_24px_rgba(16,185,129,0.35)]";
  }
  if (normalized === "MEDIUM") {
    return "bg-amber-500/20 text-amber-200 ring-1 ring-amber-300/50 shadow-[0_0_24px_rgba(245,158,11,0.35)]";
  }
  return "bg-red-500/20 text-red-200 ring-1 ring-red-300/50 shadow-[0_0_24px_rgba(239,68,68,0.35)]";
}

export default function AnswerCard({ result, citationsExpanded, onToggleCitations }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_20px_70px_-30px_rgba(76,110,245,0.5)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_90px_-30px_rgba(114,92,255,0.6)] ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <h2 className="text-lg font-semibold text-white">Answer & Trust Analysis</h2>

      {!result ? (
        <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/40 p-6">
          <p className="text-sm text-slate-300">No result yet. Upload a document and submit a query.</p>
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-100">{result.answer}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-200">Confidence</h3>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${levelStyles(
                    result.confidence_level
                  )}`}
                >
                  {String(result.confidence_level || "UNKNOWN").toUpperCase()}
                </span>
              </div>
            </div>

            <div className="mt-3">
              <ConfidenceBar score={result.confidence_score} />
            </div>

            {result.reason && (
              <p className="mt-3 text-sm text-slate-300">
                <span className="font-semibold text-slate-100">Reason:</span> {result.reason}
              </p>
            )}
          </div>

          <ClaimList claims={result.claim_support} />

          <div className="rounded-xl border border-white/10 bg-slate-950/40">
            <button
              type="button"
              onClick={onToggleCitations}
              className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-slate-200 transition hover:bg-white/5"
            >
              <span>Citations ({result.citations.length})</span>
              <span className="text-xs text-slate-400">{citationsExpanded ? "Hide" : "Show"}</span>
            </button>

            {citationsExpanded && (
              <div className="border-t border-white/10 px-4 py-3.5">
                {result.citations.length === 0 ? (
                  <p className="text-sm text-slate-400">No citations found.</p>
                ) : (
                  <ul className="space-y-2.5">
                    {result.citations.map((item, idx) => (
                      <li
                        key={`${item.document}-${item.chunk_id}-${idx}`}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2.5"
                      >
                        <span className="text-sm font-medium text-slate-200">{item.document}</span>
                        <span className="text-xs text-slate-400">chunk_id: {item.chunk_id}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}