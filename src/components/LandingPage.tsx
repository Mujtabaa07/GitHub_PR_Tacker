
import { Github, GitPullRequest, BarChart2, Star } from 'lucide-react';
import { AuthButton } from './AuthButton';

export function LandingPage() {
  return (
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
        <div className="py-12 sm:py-20">
          {/* Hero Section */}
          <div className="text-center space-y-8 mb-16">
            <Github className="h-16 w-16 sm:h-20 sm:w-20 text-blue-600 mx-auto animate-float" />
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight">
              Track and Analyze Your GitHub Pull Requests
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"> with Ease</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamline your workflow with our powerful PR tracking and analytics platform.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <GitPullRequest className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">PR Tracking</h3>
              <p className="text-gray-600">
                Track all your pull requests in one place with real-time status updates.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600">
                Get insights into your PR workflow with detailed analytics and metrics.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Favorites</h3>
              <p className="text-gray-600">
                Save your favorite repositories for quick access and monitoring.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              Ready to streamline your PR workflow?
            </h3>
            
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} GitHub PR Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 