// js/login.js
import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");

  // Wenn Nutzer schon eingeloggt ist, direkt weiter zum Dashboard
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "dashboard.html";
    }
  });

  // Login-Formular abschicken
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.textContent = "";

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Weiterleitung bei Erfolg
      window.location.href = "dashboard.html";
    } catch (error) {
      errorMsg.textContent = "Login fehlgeschlagen: " + error.message;
    }
  });
});
