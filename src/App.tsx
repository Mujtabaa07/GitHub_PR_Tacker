import { Github } from 'lucide-react';
import { RepoInput } from './components/RepoInput';
import { PRTable } from './components/PRTable';
import { AuthButton } from './components/AuthButton';
import { Analytics } from './components/Analytics';
import UserProfile from './components/UserProfile';
import { useAuthStore } from './store/authStore';

export default function App() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <Github className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                GitHub PR Tracker
              </h1>
            </div>
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-8 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">
          {user ? (
            <div className="space-y-4 sm:space-y-6 animate-fadeIn">
              <UserProfile />
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <RepoInput />
                <Analytics />
              </div>
              <PRTable />
            </div>
          ) : (
            <div className="text-center py-8 sm:py-16 animate-fadeIn">
              <div className="max-w-xl mx-auto space-y-6 sm:space-y-8 px-4">
                <Github className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mx-auto" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Welcome to GitHub PR Tracker
                </h2>
                <p className="text-lg sm:text-xl text-gray-600">
                  Track and analyze your GitHub pull requests in one place. Sign in to get started.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}