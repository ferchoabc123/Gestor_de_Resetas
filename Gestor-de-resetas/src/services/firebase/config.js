import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACsU2UgPfGEkN-Cupkhl-YqvtDqeJq6E4",
  authDomain: "recetas-project-2d875.firebaseapp.com",
  projectId: "recetas-project-2d875",
  storageBucket: "recetas-project-2d875.firebasestorage.app",
  messagingSenderId: "880934541640",
  appId: "1:880934541640:web:999ace55b134466898bb7d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);