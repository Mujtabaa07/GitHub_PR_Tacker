import React from 'react';
import { useAuthStore } from '../store/authStore';

const UserProfile: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <div className="user-profile">
      <img 
        src={user.photoURL ?? 'https://via.placeholder.com/96'} 
        alt={user.displayName ?? 'User'} 
        className="user-avatar" 
      />
      <div className="user-info">
        <h2>{user.displayName ?? 'User'}</h2>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
