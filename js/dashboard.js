// js/dashboard.js
import { auth, db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chatMessages");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");

  const chatCollection = collection(db, "chatMessages");
  const chatQuery = query(chatCollection, orderBy("createdAt"));

  // Chat-Nachrichten in Echtzeit laden
  onSnapshot(chatQuery, (snapshot) => {
    chatMessages.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const msg = document.createElement("div");
      msg.textContent = `${data.author}: ${data.text}`;
      chatMessages.appendChild(msg);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  // Nachricht senden
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("Bitte einloggen, um chatten zu können.");
      return;
    }
    const text = chatInput.value.trim();
    if (text.length === 0) return;

    try {
      await addDoc(chatCollection, {
        text,
        author: user.email,
        createdAt: serverTimestamp()
      });
      chatInput.value = "";
    } catch (error) {
      alert("Fehler beim Senden: " + error.message);
    }
  });
});
