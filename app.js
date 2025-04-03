import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("Firebase inicializado com sucesso!");