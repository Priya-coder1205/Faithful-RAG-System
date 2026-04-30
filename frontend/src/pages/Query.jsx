import { useEffect, useMemo, useState } from "react";
import AppShell from "../components/AppShell";
import { clearSession, confidenceLevel, getErrorMessage, isUnauthorizedError, normalizePercent, queryKnowledge, saveQueryResult } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Query() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [animatedConfidence, setAnimatedConfidence] = useState(0);

  const normalizedConfidence = useMemo(
    () => normalizePercent(result?.confidence_score || 0),
    [result]
  );

  useEffect(() => {
    if (!result) {
      setAnimatedConfidence(0);
      return undefined;
    }

    const target = normalizedConfidence;
    let frame = 0;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / 700, 1);
      setAnimatedConfidence(Math.round(target * progress));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [normalizedConfidence, result]);

  const handleSubmit = async () => {
    const trimmed = question.trim();

    if (!trimmed) {
      setError("Ask a real question before submitting.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await queryKnowledge(trimmed);
      const snapshot = saveQueryResult(trimmed, response);
      setResult(snapshot);
    } catch (requestError) {
      if (isUnauthorizedError(requestError)) {
        clearSession();
        navigate("/auth", { replace: true });
        return;
      }

      setResult(null);
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  const level = confidenceLevel(result?.confidence_score);

  return (
    <AppShell
      title="Query"
      subtitle="Ask a question and inspect the answer, confidence, contradictions, citations, and claim support in a single premium layout."
    >
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-5">
          <article className="glass-panel shine-border rounded-[28px] p-5 sm:p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Knowledge query</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Ask your question and get a verified response.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              The backend returns answer text, confidence, contradiction detection, citations, and claim-level support. The UI keeps the trust signals front and center.
            </p>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-slate-950/65 p-4 shadow-[0_0_36px_rgba(99,102,241,0.08)]">
              <label className="mb-3 block text-sm font-medium text-slate-200">Ask your question...</label>
              <textarea
                rows={7}
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Example: What are the evidence-backed conclusions and contradictions in the document set?"
                className="field-input w-full resize-none rounded-[22px] px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-slate-500"
              />

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-400">Protected call with bearer auth and inline error handling.</div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="glow-button inline-flex items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
                  {loading ? "Analyzing..." : "Submit query"}
                </button>
              </div>

              {error && (
                <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              )}
            </div>
          </article>

          <article className="glass-panel rounded-[28px] p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-violet-300/80">Result schema</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <SchemaItem label="Answer" value="Main highlighted response card" />
              <SchemaItem label="Confidence score" value="Animated progress bar" />
              <SchemaItem label="Confidence level" value="High, medium, or low glow badge" />
              <SchemaItem label="Claim support" value="Supported and unsupported sentence cards" />
            </div>
          </article>
        </section>

        <section className="space-y-5">
          <article className="glass-panel shine-border rounded-[28px] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Answer</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Generated intelligence answer</h3>
              </div>
              <div className="status-chip rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200">
                {result ? level : "Waiting"}
              </div>
            </div>

            {result ? (
              <>
                <p className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-5 text-sm leading-8 text-slate-200">
                  {result.answer}
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-300">Confidence score</p>
                        <p className="mt-2 text-3xl font-semibold text-white">{animatedConfidence}%</p>
                      </div>
                      <div className={`status-chip rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${confidenceToneClass(level)}`}>
                        {level}
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,#38bdf8,#8b5cf6,#c084fc)] transition-all duration-300"
                          style={{ width: `${animatedConfidence}%` }}
                        />
                      </div>
                    </div>
                  </article>

                  <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm font-medium text-slate-300">Confidence level</p>
                    <div className={`mt-3 inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${confidenceToneClass(level)}`}>
                      {level}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-400">
                      The level badge makes the trust state visible at a glance, with clear high, medium, and low tonal states.
                    </p>
                  </article>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <article className={`rounded-[24px] border px-5 py-5 ${result.contradictions_detected ? "border-red-400/20 bg-red-500/10" : "border-emerald-400/20 bg-emerald-500/10"}`}>
                    <p className="text-sm font-medium text-white">Contradictions</p>
                    <p className="mt-2 text-sm leading-7 text-slate-200">
                      {result.contradictions_detected
                        ? "A contradiction was detected in the answer path and should be reviewed."
                        : "No contradiction flag was raised for this answer."}
                    </p>
                  </article>

                  <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm font-medium text-slate-300">Citations</p>
                    <div className="mt-3 space-y-2">
                      {(result.citations || []).length > 0 ? (
                        result.citations.map((citation, index) => (
                          <div key={`${citation.document}-${citation.chunk_id}-${index}`} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm">
                            <span className="truncate text-slate-100">{citation.document}</span>
                            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">Chunk {citation.chunk_id}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-400">No citations returned.</p>
                      )}
                    </div>
                  </article>
                </div>

                <article className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-300">Claim support</p>
                      <p className="mt-1 text-sm text-slate-500">Sentence-by-sentence support with similarity badges.</p>
                    </div>
                    <span className="status-chip rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {result.claim_support?.length || 0} claims
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {(result.claim_support || []).length > 0 ? (
                      result.claim_support.map((claim, index) => {
                        const supported = Boolean(claim.supported);

                        return (
                          <div key={`${claim.sentence}-${index}`} className={`rounded-[22px] border px-4 py-4 ${supported ? "border-emerald-400/20 bg-emerald-500/10" : "border-red-400/20 bg-red-500/10"}`}>
                            <div className="flex items-start justify-between gap-4">
                              <p className="text-sm leading-7 text-slate-100">{claim.sentence}</p>
                              <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${supported ? "bg-emerald-500/20 text-emerald-200" : "bg-red-500/20 text-red-200"}`}>
                                {supported ? "Supported" : "Unsupported"}
                              </span>
                            </div>
                            <div className="mt-3 flex items-center justify-end gap-2">
                              <span className="text-xs text-slate-400">Similarity</span>
                              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white">
                                {typeof claim.similarity === "number" ? claim.similarity.toFixed(3) : "N/A"}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm text-slate-400">No claim support returned.</p>
                    )}
                  </div>
                </article>

                {result.reason && (
                  <article className="mt-4 rounded-[24px] border border-cyan-400/15 bg-cyan-500/10 px-5 py-4 text-sm leading-7 text-slate-200">
                    <span className="font-semibold text-white">Reason:</span> {result.reason}
                  </article>
                )}
              </>
            ) : (
              <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-8 text-sm leading-7 text-slate-300">
                Submit a protected query to render the answer, trust level, contradictions, citations, and claim support cards.
              </div>
            )}
          </article>
        </section>
      </div>
    </AppShell>
  );
}

function SchemaItem({ label, value }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm leading-7 text-white">{value}</p>
    </div>
  );
}

function confidenceToneClass(level) {
  const normalized = String(level || "").toUpperCase();

  if (normalized === "HIGH") {
    return "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-300/20";
  }

  if (normalized === "MEDIUM") {
    return "bg-amber-500/15 text-amber-200 ring-1 ring-amber-300/20";
  }

  return "bg-red-500/15 text-red-200 ring-1 ring-red-300/20";
}
