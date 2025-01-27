import { LogIn, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function AuthButton() {
  const { user, signIn, signOut } = useAuthStore();

  const avatarUrl = user?.photoURL || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}`;

  return user ? (
    <div className="flex items-center gap-3">
      <img 
        src={avatarUrl}
        alt={user.displayName || 'User'} 
        className="w-8 h-8 rounded-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}`;
        }}
      />
      <button
        onClick={signOut}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
      >
        <LogOut size={16} />
        Sign Out
      </button>
    </div>
  ) : (
    <button
      onClick={signIn}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
    >
      <LogIn size={16} />
      Sign In with Google
    </button>
  );
}