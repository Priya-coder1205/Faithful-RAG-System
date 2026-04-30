import { Link } from "react-router-dom";

const features = [
  {
    title: "Verified Answers",
    description: "Every response is grounded in retrieved evidence with confidence scoring and claim-level support.",
    icon: DocumentIcon,
  },
  {
    title: "Confidence Scoring",
    description: "Surface high, medium, and low certainty states with a clear visual trust signal.",
    icon: PulseIcon,
  },
  {
    title: "Secure Auth",
    description: "Bearer-token access protects uploads and queries behind a clean authentication flow.",
    icon: ShieldIcon,
  },
  {
    title: "Citations + Claims",
    description: "See citations, contradictions, and sentence-level support in one premium result view.",
    icon: LayersIcon,
  },
];

const trustPoints = [
  "Protected routes with bearer authentication",
  "Upload and query calls routed through a reusable Axios client",
  "Consistent trust UI with confidence, consistency, and contradiction states",
];

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <div className="glass-panel relative overflow-hidden rounded-[30px] px-5 py-4 sm:px-6">
          <div className="hero-orb left-0 top-0 h-52 w-52 bg-cyan-500/18" />
          <div className="hero-orb right-0 top-8 h-72 w-72 bg-violet-500/18" />

          <div className="relative flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(139,92,246,0.98),rgba(59,130,246,0.92))] shadow-[0_0_24px_rgba(99,102,241,0.36)]">
                <span className="text-sm font-black text-white">TR</span>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.18em] text-white">TRUSTWORTHY RAG</p>
                <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
                  Verified intelligence
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
              <a href="#features" className="transition hover:text-white">
                Features
              </a>
              <a href="#security" className="transition hover:text-white">
                Security
              </a>
              <a href="#pricing" className="transition hover:text-white">
                Documentation
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/auth" className="ghost-button rounded-full px-4 py-2.5 text-sm font-semibold text-white">
                Login
              </Link>
              <Link to="/auth?mode=signup" className="glow-button rounded-full px-4 py-2.5 text-sm font-semibold text-white">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="relative grid flex-1 place-items-center py-20 text-center sm:py-24 lg:min-h-[calc(100vh-8rem)] lg:py-28">
            <div className="max-w-4xl page-rise">
              <div className="status-chip inline-flex rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/90">
                Aerospace-grade verification
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white text-glow sm:text-6xl lg:text-7xl">
                Trustworthy RAG System
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                AI with verified answers, confidence scoring, and hallucination detection, designed as a modern SaaS experience.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/auth?mode=signup" className="glow-button rounded-2xl px-7 py-3.5 text-sm font-semibold text-white">
                  Get Started
                </Link>
                <Link to="/auth" className="ghost-button rounded-2xl px-7 py-3.5 text-sm font-semibold text-white">
                  Login
                </Link>
              </div>

              <div className="mt-10 grid gap-3 text-sm text-slate-400 sm:grid-cols-3">
                <StatPill value="99.9%" label="Evidence visible" />
                <StatPill value="24/7" label="Protected access" />
                <StatPill value="1 flow" label="Upload to answer" />
              </div>
            </div>
          </div>
        </div>

        <section id="features" className="py-16 sm:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Features</p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                Precision-engineered intelligence
              </h2>
            </div>
            <div className="hidden max-w-sm text-sm leading-7 text-slate-400 md:block">
              A clean, premium surface that makes verification feel deliberate rather than bolted on.
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="glass-panel shine-border rounded-[26px] p-5 transition duration-300 hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-cyan-200 ring-1 ring-white/10">
                    <Icon />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="security" className="grid gap-6 py-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">Security</p>
              <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Verification is not a feature. It is the core product.
              </h2>
            </div>

            <div className="space-y-3">
              {trustPoints.map((point) => (
                <div key={point} className="glass-panel-soft rounded-2xl px-4 py-4 text-sm leading-7 text-slate-300">
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel shine-border rounded-[28px] p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">Trust posture</p>
                <p className="mt-1 text-2xl font-semibold text-white">Enterprise-ready foundation</p>
              </div>
              <div className="status-chip rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Secure by default
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <FeatureRow label="Authentication" value="JWT bearer tokens" />
              <FeatureRow label="Protected calls" value="Header injection on upload/query" />
              <FeatureRow label="Failure handling" value="Backend errors surfaced in UI" />
            </div>
          </div>
        </section>

        <footer className="mt-8 pb-10">
          <div className="glass-panel rounded-[24px] px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Trustworthy RAG System</p>
                <p className="mt-1 text-sm text-slate-400">Verified AI answers, confidence scoring, and premium trust UX.</p>
              </div>
              <div className="flex gap-4 text-sm text-slate-400">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <span>API Status</span>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}

function StatPill({ value, label }) {
  return (
    <div className="glass-panel-soft rounded-2xl px-4 py-4 text-left">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-400">{label}</p>
    </div>
  );
}

function FeatureRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm">
      <span className="text-slate-300">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M7 3.5h7.3L19 8.2V20.5H7V3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14.3 3.5V8.2H19" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9.5 12h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9.5 15h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 14h3l2-7 3 12 2-6h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 3 19 6v5c0 4.7-3 8.9-7 10-4-1.1-7-5.3-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m9.5 12 1.8 1.8 3.2-3.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="m12 4 7 3.8-7 3.7-7-3.7L12 4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m5 11.5 7 3.7 7-3.7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m5 15.5 7 3.7 7-3.7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
