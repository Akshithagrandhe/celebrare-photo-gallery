export default function LoadingGrid() {
  return (
    <div aria-label="Loading photos" aria-live="polite">
      <div className="mb-6 flex items-center gap-3 text-sm text-stone-500">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-stone-300 border-t-moss" />
        Gathering a little inspiration...
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl border border-black/[0.04] bg-white p-0 shadow-card">
            <div className="skeleton aspect-[4/3]" />
            <div className="space-y-2 p-4">
              <div className="skeleton h-3 w-2/5 rounded" />
              <div className="skeleton h-2.5 w-1/4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
