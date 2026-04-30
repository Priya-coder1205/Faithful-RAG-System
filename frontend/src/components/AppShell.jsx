import { NavLink, useNavigate } from "react-router-dom";
import { clearSession, getStoredUser } from "../services/api";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: DashboardIcon },
  { label: "Upload", to: "/upload", icon: UploadIcon },
  { label: "Query", to: "/query", icon: SearchIcon },
  { label: "Security", to: "/security", icon: ShieldIcon },
];

function navClass({ isActive }) {
  return `sidebar-link flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium ${
    isActive ? "sidebar-link-active text-white" : "text-slate-300"
  }`;
}

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M4 13h6V4H4v9Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14 20h6V11h-6v9Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14 4h6v5h-6V4Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 20h6v-5H4v5Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M12 16V6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m8.5 9.5 3.5-3.5 3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16.5V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M12 3 19 6v5c0 4.7-3 8.9-7 10-4-1.1-7-5.3-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m9.5 12 1.8 1.8 3.2-3.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AppShell({ title, subtitle, children, actions }) {
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleLogout = () => {
    clearSession();
    navigate("/auth", { replace: true });
  };

  return (
    <div className="min-h-screen px-3 py-3 sm:px-4 lg:px-6 lg:py-5">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[1600px] gap-4 lg:gap-5">
        <aside className="glass-panel sticky top-3 hidden h-[calc(100vh-1.5rem)] w-[280px] shrink-0 flex-col rounded-[28px] p-4 lg:flex">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(139,92,246,0.98),rgba(59,130,246,0.92))] shadow-[0_0_24px_rgba(99,102,241,0.38)]">
                <span className="text-sm font-black tracking-tight text-white">TR</span>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.18em] text-white">TRUSTWORTHY</p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">RAG Engine</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Session</p>
              <p className="mt-1 text-sm font-medium text-white">{user?.email || "Active user"}</p>
              <p className="mt-1 text-xs text-cyan-300/80">Bearer auth enabled</p>
            </div>
          </div>

          <nav className="mt-5 space-y-2">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink key={to} to={to} className={navClass}>
                <Icon />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto space-y-3">
            <button
              type="button"
              onClick={handleLogout}
              className="ghost-button flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-slate-100"
            >
              Logout
            </button>
            <div className="rounded-[22px] border border-cyan-300/10 bg-cyan-400/5 px-4 py-3 text-xs leading-6 text-slate-300">
              High-trust routing, protected query paths, and verifiable retrieval outputs.
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-4 lg:space-y-5">
          <header className="glass-panel rounded-[28px] px-4 py-4 sm:px-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-300/80">
                  Trustworthy RAG System
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {title}
                  </h1>
                  <span className="status-chip rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                    Protected
                  </span>
                </div>
                {subtitle && <p className="mt-2 max-w-3xl text-sm text-slate-300">{subtitle}</p>}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="glass-panel-soft flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.7)]" />
                  Backend connected
                </div>
                {actions}
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {navItems.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-violet-500/25 text-white ring-1 ring-violet-300/30"
                        : "bg-white/5 text-slate-300"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="whitespace-nowrap rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-300"
              >
                Logout
              </button>
            </div>
          </header>

          <main className="pb-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
