import { Link } from "react-router-dom";

const stats = [
  { value: "99%", label: "Citation Accuracy" },
  { value: "3x", label: "Claim-Level Verification" },
  { value: "24/7", label: "Hybrid Semantic Search" },
];

const steps = [
  {
    title: "Upload Knowledge",
    desc: "Ingest your documents and structured context with a secure upload pipeline.",
    icon: "↑",
  },
  {
    title: "Ask Questions",
    desc: "Run natural language queries over your indexed enterprise knowledge.",
    icon: "?",
  },
  {
    title: "Receive Verified Answers",
    desc: "Get confidence scoring, source citations, and claim-level support instantly.",
    icon: "✓",
  },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Hero */}
      <section
        className="rounded-3xl border border-white/10 bg-white/5 px-6 py-14 text-center backdrop-blur-xl shadow-[0_20px_80px_-30px_rgba(98,96,255,0.45)] sm:px-10"
        style={{ animation: "fadeUp .6s ease-out both" }}
      >
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/90">
          Premium AI Knowledge Platform
        </p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
          Build decisions with{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
            explainable intelligence
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Upload knowledge, run precise queries, and validate trust with confidence scoring,
          citations, and claim-level support.
        </p>

        <div className="mt-8">
          <Link
            to="/dashboard"
            className="inline-flex rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(99,102,241,0.6)]"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Stats Strip */}
      <section
        className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-fuchsia-500/10 p-5 backdrop-blur-xl"
        style={{ animation: "fadeUp .7s ease-out both" }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-black/20 p-5 text-center"
            >
              <p className="text-3xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(56,189,248,0.45)]">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        className="mt-14"
        style={{ animation: "fadeUp .8s ease-out both" }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">How It Works</h2>
          <p className="mt-2 text-sm text-slate-300">
            A simple workflow for reliable AI-assisted knowledge intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, idx) => (
            <article
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_16px_50px_-28px_rgba(114,92,255,0.55)]"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/30 to-violet-500/30 text-lg font-bold text-cyan-200 ring-1 ring-white/20">
                {step.icon}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300/90">
                Step {idx + 1}
              </p>
              <h3 className="mt-1 text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Product Preview */}
      <section
        className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-6 backdrop-blur-xl"
        style={{ animation: "fadeUp .9s ease-out both" }}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Product Preview</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              See how teams verify AI-generated insights with transparent confidence and source
              grounding.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-[0_18px_60px_-30px_rgba(56,189,248,0.5)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs text-slate-400">Dashboard Preview</span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/35">
                HIGH CONFIDENCE
              </span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-slate-400">Answer</p>
              <p className="mt-2 text-sm text-slate-100">
                “The report confirms a measurable reduction in operational delays, supported by
                three independent source citations.”
              </p>
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Confidence</span>
                  <span>92%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-800">
                  <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_18px_rgba(16,185,129,0.45)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-fuchsia-500/10 px-6 py-14 text-center backdrop-blur-xl"
        style={{ animation: "fadeUp 1s ease-out both" }}
      >
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Turn knowledge into trusted decisions
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Build with confidence, verify every claim, and deploy intelligence your team can trust.
        </p>
        <div className="mt-7">
          <Link
            to="/dashboard"
            className="inline-flex rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(99,102,241,0.65)]"
          >
            Start Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-14 rounded-2xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-cyan-400 to-fuchsia-500" />
            <span className="text-sm font-semibold text-white">Trust-Aware AI</span>
          </div>
          <div className="flex items-center gap-5 text-sm text-slate-300">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <Link to="/dashboard" className="hover:text-white transition">
              Dashboard
            </Link>
            <Link to="/login" className="hover:text-white transition">
              Login
            </Link>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          © {new Date().getFullYear()} Trust-Aware AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}