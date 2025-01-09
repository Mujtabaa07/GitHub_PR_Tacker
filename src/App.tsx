import { Github } from 'lucide-react';
import { RepoInput } from './components/RepoInput';
import { PRTable } from './components/PRTable';
import { AuthButton } from './components/AuthButton';
import { Analytics } from './components/Analytics';
import UserProfile from './components/UserProfile';


export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Github className="h-8 w-8 text-gray-900 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                GitHub PR Tracker
              </h1>
            </div>
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <UserProfile />
          <RepoInput />
          <Analytics />
          <PRTable />
        </div>
      </main>
    </div>
  );
}