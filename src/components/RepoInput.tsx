import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { useGithubStore } from '../store/githubStore';
import { useAuthStore } from '../store/authStore';
import { useFavoriteStore } from '../store/favoriteStore';
import { FavoriteButton } from './FavoriteButton';

export function RepoInput() {
  const [repoUrl, setRepoUrl] = useState('');
  const { setRepository, error, repository } = useGithubStore();
  const { user } = useAuthStore();
  const { favorites } = useFavoriteStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await setRepository(repoUrl);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="relative">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Enter GitHub repository URL (e.g., https://github.com/owner/repo)"
            className="w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500"
          >
            <Search size={20} />
          </button>
        </div>
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </form>

      {repository && <FavoriteButton repoUrl={repoUrl} />}

      {user && favorites.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Favorite Repositories</h3>
          <div className="flex flex-wrap gap-2">
            {favorites.map((url) => (
              <button
                key={url}
                onClick={() => {
                  setRepoUrl(url);
                  setRepository(url);
                }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <Star size={14} className="mr-1 text-yellow-500" />
                {url.split('/').slice(-2).join('/')}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}