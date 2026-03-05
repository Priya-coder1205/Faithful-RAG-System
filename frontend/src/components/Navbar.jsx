import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `text-sm transition ${
    isActive ? "text-cyan-300" : "text-slate-300 hover:text-white"
  }`;

export default function Navbar() {
  return (
    <nav className="mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl shadow-[0_16px_50px_-30px_rgba(98,96,255,0.6)]">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500" />
            <span className="text-sm font-semibold tracking-wide text-white sm:text-base">
              Trust-Aware AI
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          </div>

          <Link
            to="/login"
            className="rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:shadow-[0_0_24px_rgba(99,102,241,0.55)]"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}