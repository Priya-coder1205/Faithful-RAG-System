export default function ClaimList({ claims = [] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
      <h3 className="text-sm font-semibold text-slate-200">Claim Support</h3>

      {claims.length === 0 ? (
        <p className="mt-2 text-sm text-slate-400">No claim details available.</p>
      ) : (
        <ul className="mt-3 space-y-2.5">
          {claims.map((claim, idx) => {
            const supported = Boolean(claim.supported);
            return (
              <li
                key={`${claim.sentence}-${idx}`}
                className={`rounded-lg border px-3.5 py-3 transition ${
                  supported
                    ? "border-emerald-400/25 bg-emerald-500/10"
                    : "border-red-400/25 bg-red-500/10"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm leading-6 text-slate-100">{claim.sentence}</p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      supported ? "bg-emerald-500/20 text-emerald-200" : "bg-red-500/20 text-red-200"
                    }`}
                  >
                    {supported ? "Supported" : "Unsupported"}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-slate-300">
                  Similarity:{" "}
                  {typeof claim.similarity === "number" ? claim.similarity.toFixed(3) : "N/A"}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}