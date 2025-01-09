import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCpUAT5xQOslO79SZ8K1NiIafk1F2HXzO0",
  authDomain: "github-pr-tacker.firebaseapp.com",
  projectId: "github-pr-tacker",
  storageBucket: "github-pr-tacker.firebasestorage.app",
  messagingSenderId: "819248644894",
  appId: "1:819248644894:web:f6e820c40a788fc3dcff0f",
  measurementId: "G-58S67QW1RV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);