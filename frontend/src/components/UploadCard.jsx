import { useEffect, useState } from "react";

export default function UploadCard({
  selectedFile,
  isDragging,
  setIsDragging,
  uploadLoading,
  uploadSuccess,
  uploadError,
  onFileSelect,
  onUpload,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_20px_60px_-28px_rgba(76,110,245,0.45)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_80px_-28px_rgba(114,92,255,0.55)] ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <h2 className="text-base font-semibold text-white">Document Upload</h2>
      <p className="mt-1.5 text-sm text-slate-300">Drag and drop or choose a file to index.</p>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
        className={`mt-5 rounded-xl border-2 border-dashed p-7 text-center transition ${
          isDragging
            ? "border-cyan-300/80 bg-cyan-400/10 shadow-[0_0_35px_rgba(34,211,238,0.2)]"
            : "border-white/15 bg-slate-950/40"
        }`}
      >
        <p className="truncate text-sm text-slate-200">
          {selectedFile ? selectedFile.name : "Drop file here"}
        </p>
        <p className="mt-1 text-xs text-slate-500">or</p>

        <label className="mt-3 inline-flex cursor-pointer items-center rounded-lg border border-white/15 bg-white/10 px-3.5 py-2 text-sm text-slate-100 transition hover:bg-white/15">
          Choose File
          <input
            type="file"
            className="hidden"
            onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
          />
        </label>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onUpload}
          disabled={uploadLoading}
          className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(76,110,245,0.45)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(139,92,246,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploadLoading ? "Uploading..." : "Upload"}
        </button>
        <span className="text-xs text-slate-400">Knowledge source ingestion</span>
      </div>

      <div className="mt-3 min-h-5">
        {uploadSuccess && <p className="text-sm text-emerald-300">{uploadSuccess}</p>}
        {uploadError && <p className="text-sm text-red-300">{uploadError}</p>}
      </div>
    </section>
  );
}