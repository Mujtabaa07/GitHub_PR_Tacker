import { Github } from 'lucide-react';
import { AuthButton } from './components/AuthButton';
import { LandingPage } from './components/LandingPage';
import  UserProfile  from './components/UserProfile';
import { RepoInput } from './components/RepoInput';
import { PRTable } from './components/PRTable';
import { Analytics } from './components/Analytics';
import { AIAnalysis } from './components/AIAnalysis';
import { useAuthStore } from './store/authStore';

export default function App() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return user ? (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
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
          <UserProfile />
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <RepoInput />
            <Analytics />
          </div>
          <AIAnalysis />
          <PRTable />
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} GitHub PR Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  ) : (
    <LandingPage />
  );
}