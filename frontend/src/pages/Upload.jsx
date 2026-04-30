import { useEffect, useMemo, useState } from "react";
import AppShell from "../components/AppShell";
import { getErrorMessage, incrementDocsIndexed, uploadDocument } from "../services/api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading) {
      setProgress((value) => (success ? 100 : value > 0 ? value : 0));
      return undefined;
    }

    setProgress(12);
    const timer = window.setInterval(() => {
      setProgress((value) => Math.min(value + 16, 92));
    }, 160);

    return () => window.clearInterval(timer);
  }, [loading, success]);

  const statusLabel = useMemo(() => {
    if (success) return "Indexed successfully";
    if (error) return "Upload failed";
    if (loading) return "Uploading";
    return "Ready";
  }, [error, loading, success]);

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files?.[0];

    if (dropped) {
      setFile(dropped);
      setError("");
      setSuccess("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Choose a PDF or TXT file before uploading.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await uploadDocument(file);
      incrementDocsIndexed(1);
      setProgress(100);
      setSuccess(`Indexed ${response?.chunks_indexed ?? 0} chunks from ${file.name}.`);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      title="Upload"
      subtitle="Drop in a document, watch the progress state move, and push knowledge into the retrieval index."
    >
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="glass-panel shine-border rounded-[28px] p-5 sm:p-6">
          <div
            onDragOver={(event) => event.preventDefault()}
            onDragEnter={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setDragging(false);
            }}
            onDrop={handleDrop}
            className={`flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border-2 border-dashed px-6 py-10 text-center transition duration-300 ${
              dragging
                ? "border-cyan-300/80 bg-cyan-400/10 shadow-[0_0_36px_rgba(34,211,238,0.16)]"
                : "border-white/12 bg-white/[0.03]"
            }`}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,rgba(139,92,246,0.24),rgba(59,130,246,0.18))] text-cyan-200 shadow-[0_0_26px_rgba(99,102,241,0.22)]">
              <UploadCloudIcon />
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-white">Drag and drop documents here</h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-slate-400">
              Supported formats are PDF and TXT. The backend indexes the file and updates the trust-aware knowledge base.
            </p>

            <label className="glow-button mt-6 inline-flex cursor-pointer items-center rounded-2xl px-5 py-3 text-sm font-semibold text-white">
              Choose file
              <input
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={(event) => {
                  const selected = event.target.files?.[0] || null;
                  setFile(selected);
                  setError("");
                  setSuccess("");
                }}
              />
            </label>

            <div className="mt-6 w-full max-w-xl rounded-[22px] border border-white/10 bg-slate-950/55 p-4 text-left">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-300">Selected file</span>
                <span className="text-slate-500">{statusLabel}</span>
              </div>
              <p className="mt-2 truncate text-sm font-medium text-white">{file?.name || "No file selected"}</p>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Upload progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#38bdf8,#8b5cf6,#c084fc)] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {success && (
                <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                  {success}
                </p>
              )}
              {error && (
                <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleUpload}
              disabled={loading}
              className="glow-button mt-6 inline-flex items-center justify-center rounded-2xl px-6 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Uploading..." : "Upload document"}
            </button>
          </div>
        </section>

        <aside className="space-y-5">
          <article className="glass-panel rounded-[28px] p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Processing architecture</p>
            <div className="mt-4 space-y-4">
              <ProcessStep number="1" title="File intake" description="The file is posted to the FastAPI upload endpoint with the bearer token attached." />
              <ProcessStep number="2" title="Chunk indexing" description="The backend splits, embeds, and indexes the content for retrieval." />
              <ProcessStep number="3" title="Ready for query" description="Once indexed, the knowledge base becomes available for protected question answering." />
            </div>
          </article>

          <article className="glass-panel rounded-[28px] p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-violet-300/80">Upload constraints</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              <InfoRow label="Accepted formats" value="PDF, TXT" />
              <InfoRow label="Auth required" value="Yes" />
              <InfoRow label="Progress display" value="Animated" />
              <InfoRow label="Failure states" value="Shown inline" />
            </div>
          </article>
        </aside>
      </div>
    </AppShell>
  );
}

function ProcessStep({ number, title, description }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-xs font-semibold text-white">
          {number}
        </div>
        <div>
          <p className="font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm leading-7 text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

function UploadCloudIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
      <path d="M7.5 18H6.8A4.8 4.8 0 0 1 6.8 8.4a6.5 6.5 0 0 1 12.4 1.6A3.8 3.8 0 0 1 18 18h-1.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m12 10.5 0 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m8.8 13.3 3.2-3.2 3.2 3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
