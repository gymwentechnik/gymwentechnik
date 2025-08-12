// js/news.js
import { db } from "./firebase-config.js";
import { collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("newsContainer");
  const q = query(collection(db, "news"), orderBy("createdAt", "desc"));

  onSnapshot(q, (snapshot) => {
    newsContainer.innerHTML = ""; // Container leeren

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      const newsItem = document.createElement("article");
      newsItem.classList.add("news-item");

      newsItem.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.content}</p>
        <small>von ${data.author || "Unbekannt"} am ${
          data.createdAt ? data.createdAt.toDate().toLocaleString() : ""
        }</small>
      `;

      newsContainer.appendChild(newsItem);
    });
  });
});
