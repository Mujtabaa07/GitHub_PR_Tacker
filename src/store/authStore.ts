import { create } from 'zustand';
import { 
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { createClient } from '@supabase/supabase-js';
import { auth } from '../lib/firebase';

const provider = new GoogleAuthProvider();

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  signIn: async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      // Store user in Supabase with guaranteed photoURL
      await supabase.from('users').upsert({
        id: user.uid,
        email: user.email,
        name: user.displayName,
        avatar_url: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}`,
        last_login: new Date().toISOString()
      });

      // Ensure user data is set correctly
      set({ 
        user: {
          ...user,
          // Ensure photoURL has a fallback
          photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}`
        }, 
        error: null 
      });
    } catch (error) {
      console.error('Sign in error:', error);
      set({ error: 'Failed to sign in with Google' });
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, error: null });
    } catch {
      set({ error: 'Failed to sign out' });
    }
  }
}));

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user, isLoading: false });
});