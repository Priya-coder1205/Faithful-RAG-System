import { useState } from "react";
import SidebarLayout from "../components/SidebarLayout";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [model, setModel] = useState("gpt-4o-mini");

  return (
    <SidebarLayout
      title="Settings"
      subtitle="Configure platform preferences and model behavior."
    >
      <section className="space-y-5">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-sm font-medium text-white">Theme</p>
          <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-slate-950/40 px-4 py-3">
            <span className="text-sm text-slate-300">Dark Mode (UI only)</span>
            <button
              type="button"
              onClick={() => setDarkMode((v) => !v)}
              className={`h-7 w-14 rounded-full p-1 transition ${
                darkMode ? "bg-blue-500/70" : "bg-slate-700"
              }`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-white transition ${
                  darkMode ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <label className="text-sm font-medium text-white">Model Selection (UI only)</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="mt-3 w-full rounded-lg border border-white/15 bg-slate-950/45 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-400/35"
          >
            <option value="gpt-4o-mini">GPT-4o Mini</option>
            <option value="gpt-4.1">GPT-4.1</option>
            <option value="claude-3.5">Claude 3.5</option>
            <option value="mixtral-8x7b">Mixtral 8x7B</option>
          </select>
        </div>
      </section>
    </SidebarLayout>
  );
}