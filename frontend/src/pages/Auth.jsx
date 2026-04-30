import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { clearSession, getErrorMessage, login, saveSession, signup } from "../services/api";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const initialMode = useMemo(() => {
    return searchParams.get("mode") === "signup" ? "signup" : "login";
  }, [searchParams]);

  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        await signup(trimmedEmail, trimmedPassword);
      }

      const session = await login(trimmedEmail, trimmedPassword);
      saveSession({ token: session.access_token, email: trimmedEmail });
      navigate(location.state?.from || "/dashboard", { replace: true });
    } catch (requestError) {
      clearSession();
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="hero-orb left-[8%] top-[12%] h-72 w-72 bg-cyan-500/18" />
      <div className="hero-orb right-[8%] bottom-[12%] h-72 w-72 bg-violet-500/20" />

      <div className="glass-panel shine-border page-rise w-full max-w-6xl overflow-hidden rounded-[32px]">
        <div className="grid min-h-[680px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden flex-col justify-between border-r border-white/10 bg-[linear-gradient(180deg,rgba(10,17,34,0.98),rgba(11,18,39,0.82))] p-10 lg:flex">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Trustworthy RAG</p>
              <h1 className="mt-4 max-w-lg text-5xl font-semibold tracking-tight text-white text-glow">
                Verified AI for teams that need precision.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                Capture knowledge, authenticate users, and move from questions to evidence-backed answers without breaking the trust experience.
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <AuthBullet title="Glowing inputs" description="Focus states and feedback designed for a premium SaaS surface." />
              <AuthBullet title="Protected routes" description="Dashboard, upload, and query pages redirect to authentication when the token is missing." />
              <AuthBullet title="Backend real data" description="Signup, login, upload, and query all map directly to FastAPI endpoints." />
            </div>
          </div>

          <div className="flex items-center justify-center p-5 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="w-full max-w-xl rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_35px_100px_-45px_rgba(99,102,241,0.85)] backdrop-blur-2xl sm:p-8">
              <div className="mx-auto max-w-md text-center">
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Secure access</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Toggle between login and signup, then enter the backend-issued bearer session.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 rounded-2xl bg-slate-950/60 p-1 ring-1 ring-white/10">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    mode === "login"
                      ? "bg-[linear-gradient(135deg,rgba(167,139,250,0.95),rgba(96,165,250,0.9))] text-white shadow-[0_0_24px_rgba(99,102,241,0.35)]"
                      : "text-slate-400"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    mode === "signup"
                      ? "bg-[linear-gradient(135deg,rgba(167,139,250,0.95),rgba(96,165,250,0.9))] text-white shadow-[0_0_24px_rgba(99,102,241,0.35)]"
                      : "text-slate-400"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    className="field-input w-full rounded-2xl px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-500"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="field-input w-full rounded-2xl px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-500"
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                  />
                </div>
              </div>

              {error && (
                <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="glow-button mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
                {loading ? "Processing..." : mode === "login" ? "Login" : "Create account"}
              </button>

              <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
                <span>Need a clean reset?</span>
                <Link to="/" className="transition hover:text-white">
                  Back to landing
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthBullet({ title, description }) {
  return (
    <div className="glass-panel-soft rounded-[24px] px-4 py-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm leading-7 text-slate-400">{description}</p>
    </div>
  );
}
