export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl space-y-6">
        <div className="inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400 border border-blue-500/20">
          Civic Intelligence Platform
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
          CivicLens
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          AI-assisted civic issue classification, grounded RAG guidance, incident deduplication, and authority routing.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 text-left w-full sm:w-64">
            <h3 className="font-semibold text-slate-200">Citizen Flow</h3>
            <p className="text-sm text-slate-400 mt-1">Photo capture, GPS tagging, and grounded AI triage.</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 text-left w-full sm:w-64">
            <h3 className="font-semibold text-slate-200">Authority Dashboard</h3>
            <p className="text-sm text-slate-400 mt-1">Deduplicated incident queue, priority scoring, and routing.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
