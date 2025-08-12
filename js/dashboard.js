// js/dashboard.js
import { auth, db } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const newsForm = document.getElementById("newsForm");
  const newsTitle = document.getElementById("newsTitle");
  const newsContent = document.getElementById("newsContent");
  const newsContainer = document.getElementById("newsContainer");
  const logoutBtn = document.getElementById("logoutBtn");
  const adminEmail = "gwadmin@gymwentechnik.de";

  // Auth Status prüfen
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // Nicht eingeloggt? Zurück zum Login
      window.location.href = "login.html";
      return;
    }

    // Optional: Begrüßung o.Ä. mit user.email
    console.log("Eingeloggt als:", user.email);
  });

  // Logout Button
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html"; // Startseite nach Logout
  });

  // News hinzufügen (nur Admin)
  newsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user || user.email !== adminEmail) {
      alert("Nur Admin darf News hinzufügen.");
      return;
    }

    const title = newsTitle.value.trim();
    const content = newsContent.value.trim();

    if (!title || !content) {
      alert("Bitte Titel und Inhalt eingeben.");
      return;
    }

    try {
      await addDoc(collection(db, "news"), {
        title,
        content,
        createdAt: serverTimestamp(),
        author: user.email
      });
      newsForm.reset();
      alert("News erfolgreich hinzugefügt!");
    } catch (error) {
      alert("Fehler beim Hinzufügen: " + error.message);
    }
  });

  // News laden und anzeigen
  const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    newsContainer.innerHTML = ""; // Leeren

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      const newsItem = document.createElement("div");
      newsItem.classList.add("news-item");

      newsItem.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.content}</p>
        <small>von ${data.author || "Unbekannt"} am ${
        data.createdAt ? data.createdAt.toDate().toLocaleString() : ""
      }</small>
      `;

      // Admin darf News löschen
      if (auth.currentUser && auth.currentUser.email === adminEmail) {
        const delBtn = document.createElement("button");
        delBtn.textContent = "Löschen";
        delBtn.addEventListener("click", async () => {
          if (confirm("News wirklich löschen?")) {
            await deleteDoc(doc(db, "news", docSnap.id));
          }
        });
        newsItem.appendChild(delBtn);
      }

      newsContainer.appendChild(newsItem);
    });
  });
});
