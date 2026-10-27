import { getPhotoDisplayName } from '../data/photoDisplayNames.js'

export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  const displayName = getPhotoDisplayName(photo.id)

  return (
    <article className="group overflow-hidden rounded-2xl border border-black/[0.04] bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`A photo by ${displayName}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          aria-label={isFavorite ? `Remove ${displayName}'s photo from favourites` : `Add ${displayName}'s photo to favourites`}
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full backdrop-blur-md transition focus:outline-none focus:ring-2 focus:ring-white ${
            isFavorite ? 'bg-white text-rose-500' : 'bg-black/25 text-white hover:bg-white hover:text-rose-500'
          }`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.8 8.8c0 4.2-8.8 10-8.8 10S3.2 13 3.2 8.8A4.3 4.3 0 0 1 12 6.7a4.3 4.3 0 0 1 8.8 2.1Z" />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-between px-4 py-3.5">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">{displayName}</p>
          <p className="mt-0.5 text-xs text-stone-400">Photo no. {photo.id}</p>
        </div>
        <span className="ml-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">Gallery</span>
      </div>
    </article>
  )
}
