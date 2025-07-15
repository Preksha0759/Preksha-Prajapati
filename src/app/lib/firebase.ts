import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjo5j1KCIMxhb7a53DziEbKs9J71g6Zb4",
  authDomain: "eventra-pgazq.firebaseapp.com",
  projectId: "eventra-pgazq",
  storageBucket: "eventra-pgazq.firebasestorage.app",
  messagingSenderId: "322807287151",
  appId: "1:322807287151:web:83f2cedf63eaa23b82ec9a"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
