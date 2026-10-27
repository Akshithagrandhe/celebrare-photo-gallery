# Still — Photo Gallery

A small React photo gallery built for the Celebrare Frontend Internship assignment. It loads 30 photos from Lorem Picsum, filters them by author, and saves liked photo IDs in the browser.

## Run it locally

Install the packages, then start the Vite development server:

```bash
npm install
npm run dev
```

Open the local address printed by Vite. To make a production build, run `npm run build`. To preview that build, run `npm run preview`.

## Project map

```text
src/
  components/
    LoadingGrid.jsx   Loading spinner and placeholder cards
    PhotoCard.jsx     One photo, author, and favourite button
    PhotoGrid.jsx     Responsive list of photo cards
  hooks/
    useFetchPhotos.js Loads the photo list and reports loading/errors
    useFavorites.js   Reducer-backed favourite state and localStorage
  App.jsx             Page layout, search state, and filtered results
  index.css           Tailwind layers and a few global styles
  main.jsx            React app entry point
```

## React ideas used

- `useFetchPhotos` keeps API loading and error handling out of the page component. It also cancels a request if the component is removed.
- `useCallback` keeps the author search handler stable. `useMemo` recalculates the case-insensitive filter when the photos or search text changes; it never calls the API again.
- `useReducer` handles favourite `add` and `remove` actions in one predictable place. The hook reads saved IDs at startup and writes them to `localStorage` after changes.
- Tailwind breakpoints set the grid to one column by default, two at `sm`, and four at `lg`.

## Quick manual checks

1. Start the app while online and confirm that 30 photo cards load.
2. Search for part of an author name with different letter casing. Try a name that matches nothing, then clear the search.
3. Click a heart, refresh the page, and confirm that the same photo remains favourited. Click it again to remove it, then refresh once more.
4. Resize the browser to a phone width, a tablet width, and a desktop width to see the one, two, and four-column layouts.
5. To see the error message, temporarily go offline and reload the page; restore the connection afterward.
