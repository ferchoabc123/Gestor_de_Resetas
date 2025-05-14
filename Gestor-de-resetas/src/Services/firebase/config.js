// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACsU2UgPfGEkN-Cupkhl-YqvtDqeJq6E4",
  authDomain: "recetas-project-2d875.firebaseapp.com",
  projectId: "recetas-project-2d875",
  storageBucket: "recetas-project-2d875.firebasestorage.app",
  messagingSenderId: "880934541640",
  appId: "1:880934541640:web:999ace55b134466898bb7d"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);