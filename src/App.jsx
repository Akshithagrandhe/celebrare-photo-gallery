import { useCallback, useMemo, useState } from 'react'
import LoadingGrid from './components/LoadingGrid.jsx'
import PhotoGrid from './components/PhotoGrid.jsx'
import { filterPhotosByDisplayName } from './data/photoDisplayNames.js'
import { useFavorites } from './hooks/useFavorites.js'
import { useFetchPhotos } from './hooks/useFetchPhotos.js'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path strokeLinecap="round" d="m16 16 4.2 4.2" />
    </svg>
  )
}

export default function App() {
  const { photos, loading, error } = useFetchPhotos()
  const { favorites, toggleFavorite } = useFavorites()
  const [searchTerm, setSearchTerm] = useState('')

  // Keep the input handler stable, and filter locally as the visitor types.
  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    return filterPhotosByDisplayName(photos, searchTerm)
  }, [photos, searchTerm])

  const likedPhotos = useMemo(() => {
    const favoritesOnly = photos.filter((photo) => favorites.includes(photo.id))
    return filterPhotosByDisplayName(favoritesOnly, searchTerm)
  }, [photos, favorites, searchTerm])

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-stone-200/80 bg-paper/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Still home">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-moss text-white">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
                <circle cx="9" cy="10" r="1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 17 4-4 3 3 3-4 4 5" />
              </svg>
            </span>
            <span className="font-display text-xl tracking-tight">still<span className="text-moss">.</span></span>
          </a>
          <div className="flex items-center gap-2 text-xs font-medium text-stone-500 sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" />
            <span>Photo journal</span>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
        <section className="mb-10 flex flex-col justify-between gap-8 md:mb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-moss">A collection of moments</p>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Find a little <span className="italic text-moss">wonder.</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-stone-500 sm:text-base">
              A quiet corner of the internet for beautiful things seen by someone, somewhere.
            </p>
          </div>
          <div className="w-full md:max-w-xs">
            <label htmlFor="author-search" className="mb-2 block text-xs font-medium text-stone-500">Find a photographer</label>
            <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-moss focus-within:ring-2 focus-within:ring-moss/10">
              <span className="text-stone-400"><SearchIcon /></span>
              <input
                id="author-search"
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by author..."
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-stone-400"
              />
              {searchTerm && (
                <button type="button" onClick={() => setSearchTerm('')} className="text-xs font-medium text-moss hover:text-ink" aria-label="Clear search">Clear</button>
              )}
            </div>
          </div>
        </section>

        <section aria-label="Photo gallery">
          <div className="mb-5 flex items-center justify-between border-b border-stone-200 pb-4">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-xl">The collection</h2>
              {!loading && !error && <span className="rounded-full bg-stone-200/70 px-2.5 py-1 text-[11px] font-medium text-stone-500">{filteredPhotos.length} photos</span>}
            </div>
            <p className="hidden text-xs text-stone-400 sm:block">Tap a heart to keep a favourite</p>
          </div>

          {loading ? <LoadingGrid /> : null}

          {!loading && error && (
            <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-8 text-center">
              <p className="font-medium text-rose-800">We couldn’t find the photos.</p>
              <p className="mt-2 text-sm text-rose-700">{error}</p>
            </div>
          )}

          {!loading && !error && filteredPhotos.length > 0 && (
            <PhotoGrid photos={filteredPhotos} favorites={favorites} onToggleFavorite={toggleFavorite} />
          )}

          {!loading && !error && filteredPhotos.length === 0 && (
            <div className="rounded-2xl border border-dashed border-stone-300 px-6 py-16 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-stone-100 text-stone-400"><SearchIcon /></span>
              <p className="mt-4 font-display text-xl">No moments found</p>
              <p className="mt-2 text-sm text-stone-500">Try another photographer’s name.</p>
            </div>
          )}
        </section>

        {!loading && !error && (
          <section aria-label="Liked photos" className="mt-14">
            <div className="mb-5 flex items-center justify-between border-b border-stone-200 pb-4">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-xl">Liked photos</h2>
                <span className="rounded-full bg-stone-200/70 px-2.5 py-1 text-[11px] font-medium text-stone-500">{likedPhotos.length}</span>
              </div>
            </div>
            {likedPhotos.length > 0 ? (
              <PhotoGrid photos={likedPhotos} favorites={favorites} onToggleFavorite={toggleFavorite} />
            ) : (
              <p className="rounded-2xl border border-dashed border-stone-300 px-6 py-10 text-center text-sm text-stone-500">
                {favorites.length > 0 ? 'No liked photos match your search.' : 'Your liked photos will appear here.'}
              </p>
            )}
          </section>
        )}
      </main>

      <footer className="border-t border-stone-200/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>Made for the moments worth keeping.</p>
          <p>Photos from <a href="https://picsum.photos/" target="_blank" rel="noreferrer" className="underline decoration-stone-300 underline-offset-2 hover:text-moss">Lorem Picsum</a></p>
        </div>
      </footer>
    </div>
  )
}
