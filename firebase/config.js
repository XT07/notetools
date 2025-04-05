// firebase/config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// Você pode remover o analytics se não estiver usando
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnUsYPMwxyEzLNRrZ5ui0ci3SHvrZWyMQ",
  authDomain: "notetools-6ce75.firebaseapp.com",
  projectId: "notetools-6ce75",
  storageBucket: "notetools-6ce75.firebasestorage.app",
  messagingSenderId: "571818547958",
  appId: "1:571818547958:web:0dc9a44b0dc14c63402ad7",
  measurementId: "G-BZ94S26015"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Se não for usar analytics, pode comentar essa linha
// const analytics = getAnalytics(app);

export { db };