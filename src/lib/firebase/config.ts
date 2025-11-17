import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBQk5nZBUVEh-85Y-pE4hSpkbvfHDpC7a0",
  authDomain: "buatproduct.firebaseapp.com",
  projectId: "buatproduct",
  storageBucket: "buatproduct.firebasestorage.app",
  messagingSenderId: "481853119033",
  appId: "1:481853119033:web:52b78227edc026d5324be8",
  measurementId: "G-EB9MMY07KM"
};

// Initialize Firebase (client-side)
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: Analytics | null = null;

if (typeof window !== 'undefined') {
  // Only initialize on client-side
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  // Initialize Analytics only if supported
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, storage, analytics };
