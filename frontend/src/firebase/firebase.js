// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "job-seeker-app-fa627.firebaseapp.com",
  projectId: "job-seeker-app-fa627",
  storageBucket: "job-seeker-app-fa627.appspot.com",
  messagingSenderId: "732188750649",
  appId: "1:732188750649:web:5f85e2202b0e5fe77f6ee8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
