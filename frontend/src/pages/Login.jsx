import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim() && password.trim()) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-92px)] w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl shadow-[0_20px_80px_-30px_rgba(98,96,255,0.55)]"
      >
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-300">Sign in to continue to your dashboard.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs text-slate-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-lg border border-white/15 bg-slate-950/45 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-400/35"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/15 bg-slate-950/45 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-400/35"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:shadow-[0_0_28px_rgba(99,102,241,0.6)]"
        >
          Login
        </button>
      </form>
    </div>
  );
}