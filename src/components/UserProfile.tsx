import React from 'react';
import { useAuthStore } from '../store/authStore';

const UserProfile: React.FC = () => {
  const { user } = useAuthStore();
  
  if (!user) {
    return null;
  }

  // Create fallback URL using user's display name
  const avatarUrl = user.photoURL || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}`;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <img 
          src={avatarUrl}
          alt={user.displayName ?? 'User'} 
          className="w-20 h-20 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}`;
          }}
        />
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-xl font-semibold text-gray-900 text-center sm:text-left">
            {user.displayName ?? 'User'}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
