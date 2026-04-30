import AppShell from "../components/AppShell";
import { getStoredUser } from "../services/api";

const protections = [
  {
    title: "Bearer authentication",
    description: "Every protected request is sent with Authorization: Bearer <token> from the shared Axios client.",
  },
  {
    title: "Route protection",
    description: "Dashboard, upload, query, and security screens are hidden behind a front-end guard when no token exists.",
  },
  {
    title: "Inline failure handling",
    description: "Backend errors are displayed directly in the UI, and 401 responses route users back to the auth screen.",
  },
  {
    title: "Trust visibility",
    description: "Confidence scoring, contradiction detection, citations, and claim support are shown as first-class controls.",
  },
];

export default function Security() {
  const user = getStoredUser();

  return (
    <AppShell
      title="Security"
      subtitle="Review the auth posture, protected call pattern, and the trust signals exposed by the interface."
    >
      <div className="grid gap-5 lg:grid-cols-[0.96fr_1.04fr]">
        <section className="space-y-5">
          <article className="glass-panel shine-border rounded-[28px] p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Current session</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Authenticated access</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              The app keeps session data in local storage for the bearer token and user identity, then sends it into the FastAPI backend on protected calls.
            </p>

            <div className="mt-5 space-y-3">
              <SessionRow label="User" value={user?.email || "Unknown"} />
              <SessionRow label="Header" value="Authorization: Bearer <token>" />
              <SessionRow label="Protected routes" value="Dashboard, Upload, Query, Security" />
            </div>
          </article>

          <article className="glass-panel rounded-[28px] p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-violet-300/80">Controls</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              <SessionRow label="401 handling" value="Redirects to /auth" />
              <SessionRow label="Error visibility" value="Backend detail messages shown inline" />
              <SessionRow label="Upload check" value="PDF and TXT only" />
            </div>
          </article>
        </section>

        <section className="grid gap-5 sm:grid-cols-2">
          {protections.map((item) => (
            <article key={item.title} className="glass-panel shine-border rounded-[28px] p-5 transition duration-300 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-cyan-200 ring-1 ring-white/10">
                <ShieldIcon />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
            </article>
          ))}
        </section>
      </div>
    </AppShell>
  );
}

function SessionRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <span className="text-slate-400">{label}</span>
      <span className="max-w-[60%] truncate text-right font-medium text-white">{value}</span>
    </div>
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
