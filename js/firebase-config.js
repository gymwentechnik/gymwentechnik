// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNirG7l4kmG6noSRK9tr90TyhyQZ8n0nA",
  authDomain: "gymwen-technik.firebaseapp.com",
  projectId: "gymwen-technik",
  storageBucket: "gymwen-technik.appspot.com",
  messagingSenderId: "218002112607",
  appId: "1:218002112607:web:316bc316c6c78e889c1bea"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
