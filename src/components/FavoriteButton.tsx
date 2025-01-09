
import { Star, StarOff } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useFavoriteStore } from '../store/favoriteStore';

interface FavoriteButtonProps {
  repoUrl: string;
}

export function FavoriteButton({ repoUrl }: FavoriteButtonProps) {
  const { user } = useAuthStore();
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const isFavorite = favorites.includes(repoUrl);

  if (!user) return null;

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(repoUrl);
    } else {
      addFavorite(repoUrl);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        isFavorite
          ? 'text-yellow-600 hover:text-yellow-700'
          : 'text-gray-400 hover:text-gray-500'
      }`}
    >
      {isFavorite ? <Star size={16} /> : <StarOff size={16} />}
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
}