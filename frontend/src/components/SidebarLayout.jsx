import { NavLink } from "react-router-dom";

const items = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Query History", to: "/history" },
  { label: "Analytics", to: "/analytics" },
  { label: "Settings", to: "/settings" },
];

function linkClass({ isActive }) {
  return `block rounded-lg px-3 py-2 text-sm transition ${
    isActive
      ? "bg-gradient-to-r from-blue-500/30 to-violet-500/30 text-cyan-200 ring-1 ring-cyan-300/25"
      : "text-slate-300 hover:bg-white/5 hover:text-white"
  }`;
}

export default function SidebarLayout({ title, subtitle, children }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-[0_20px_70px_-35px_rgba(98,96,255,0.6)]">
            <p className="mb-3 px-2 text-xs uppercase tracking-[0.18em] text-cyan-300/80">
              Platform
            </p>
            <nav className="space-y-1.5">
              {items.map((item) => (
                <NavLink key={item.to} to={item.to} className={linkClass}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        <main className="lg:col-span-9">
          <header className="mb-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl shadow-[0_20px_80px_-30px_rgba(98,96,255,0.45)]">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h1>
            {subtitle && <p className="mt-2 text-sm text-slate-300">{subtitle}</p>}
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}