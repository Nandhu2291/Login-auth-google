import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiyhBysm-6mbUrzGgB8Qd2FJixbI3_6KY",
    authDomain: "login-auth-cd03e.firebaseapp.com",
    projectId: "login-auth-cd03e",
    storageBucket: "login-auth-cd03e.firebasestorage.app",
    messagingSenderId: "924693611938",
    appId: "1:924693611938:web:7c26c74c96b4271ab4defb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
