// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnUsYPMwxyEzLNRrZ5ui0ci3SHvrZWyMQ",
  authDomain: "notetools-6ce75.firebaseapp.com",
  projectId: "notetools-6ce75",
  storageBucket: "notetools-6ce75.firebasestorage.app",
  messagingSenderId: "571818547958",
  appId: "1:571818547958:web:0dc9a44b0dc14c63402ad7",
  measurementId: "G-BZ94S26015"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };