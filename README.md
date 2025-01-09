# GitHub PR Tracker

![GitHub PR Tracker](https://your-banner-image-url.png)

A modern, feature-rich application for tracking and analyzing GitHub Pull Requests with AI-powered insights.

## 🌟 Features

- **Real-time PR Tracking**: Monitor pull requests across repositories with live updates
- **AI Analysis**: Get intelligent insights about your PRs using Google's Gemini Pro AI
- **Analytics Dashboard**: Visualize PR statistics with interactive charts
- **Authentication**: Secure Google authentication with Firebase
- **Favorites System**: Save and quickly access your frequently monitored repositories
- **Responsive Design**: Seamless experience across all devices
- **Advanced Filtering**: Filter PRs by status, labels, and search terms
- **Export Functionality**: Export PR data to CSV format

## 🚀 Tech Stack

- **Frontend**: React with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Supabase
- **AI Integration**: Google Gemini Pro
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🛠️ Environment Variables

Create a `.env` file in the root directory with the following variables:
env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GITHUB_TOKEN=
VITE_GOOGLE_AI_KEY=


## 🚀 Installation

1. Clone the repository:
   ```bash
git clone https://github.com/yourusername/github-pr-tracker.git
   ```
2. Install dependencies:
```bash
cd github-pr-tracker
npm install
```
3. Start the development server:
   ```bash
npm run dev
```

## 📁 Project Structure
src/
├── components/ # React components
├── services/ # Service layer (AI, Queue)
├── store/ # Zustand store definitions
├── types/ # TypeScript type definitions
├── lib/ # Library configurations
├── App.tsx # Main application component
└── main.tsx # Application entry point

## 🔒 Authentication Flow

1. Users sign in with Google via Firebase Authentication
2. User data is stored in Supabase
3. Authentication state is managed using Zustand store

## 🤖 AI Integration

The application uses Google's Gemini Pro AI model for:
- PR analysis
- Code review suggestions
- Commit message analysis
- Development insights

## 📊 Data Management

- **GitHub API**: Fetches PR data using Octokit
- **Rate Limiting**: Implements queue system for API requests
- **State Management**: Uses Zustand for global state
- **Persistence**: Favorites stored in local storage

## 🎨 Styling

- Utilizes Tailwind CSS for responsive design
- Custom animations and transitions
- Consistent color scheme and typography
- Mobile-first approach

## 🔍 Features in Detail

### Pull Request Table
- Sortable columns
- Status indicators
- Label management
- Comment tracking
- Quick actions

### Analytics Dashboard
- PR status distribution
- Timeline views
- Label statistics
- Activity metrics

### AI Chat Interface
- Real-time analysis
- Code suggestions
- Performance insights
- Chat history

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work - [YourGitHub](https://github.com/Mujtabaa07)

## 🙏 Acknowledgments

- Firebase for authentication
- Supabase for database
- Google for AI capabilities
- GitHub for API access
- Open source community

## 📧 Contact

Your Name - Mohamed Mujtaba - mohamedmujtaba07@gmail.com

Project Link:([https://github.com/yourusername/github-pr-tracker](https://github.com/Mujtabaa07/GitHub_PR_Tacker))
