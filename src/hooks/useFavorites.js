import { useEffect, useReducer } from 'react'

const STORAGE_KEY = 'still-gallery-favorites'

function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state.includes(action.id) ? state : [...state, action.id]
    case 'remove':
      return state.filter((id) => id !== action.id)
    default:
      return state
  }
}

export function useFavorites() {
  const [favorites, dispatch] = useReducer(favoritesReducer, undefined, readFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // The gallery still works when browser storage is unavailable.
    }
  }, [favorites])

  function toggleFavorite(id) {
    dispatch({ type: favorites.includes(id) ? 'remove' : 'add', id })
  }

  return { favorites, toggleFavorite }
}
