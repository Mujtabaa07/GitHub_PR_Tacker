import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteStore {
  favorites: string[];
  addFavorite: (repoUrl: string) => void;
  removeFavorite: (repoUrl: string) => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (repoUrl: string) =>
        set((state) => ({
          favorites: [...state.favorites, repoUrl]
        })),
      removeFavorite: (repoUrl: string) =>
        set((state) => ({
          favorites: state.favorites.filter(url => url !== repoUrl)
        }))
    }),
    {
      name: 'favorite-repos'
    }
  )
);