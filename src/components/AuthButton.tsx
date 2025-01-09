import { LogIn, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function AuthButton() {
  const { user, signIn, signOut } = useAuthStore();

  const avatarUrl = user?.photoURL || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}`;

  return user ? (
    <div className="flex items-center gap-3">
      <div className="group relative">
        <img 
          src={avatarUrl}
          alt={user.displayName || 'User'} 
          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 transition-all hover:ring-blue-400"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}`;
          }}
        />
        <div className="absolute -bottom-1 -right-1">
          <button
            onClick={signOut}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors shadow-sm"
            title="Sign Out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <button
      onClick={signIn}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <LogIn size={16} />
      Sign In with Google
    </button>
  );
}