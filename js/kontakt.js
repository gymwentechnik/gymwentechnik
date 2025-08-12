// js/kontakt.js
document.addEventListener("DOMContentLoaded", () => {
  const kontaktForm = document.getElementById("kontaktForm");
  const statusMsg = document.getElementById("statusMsg");

  kontaktForm.addEventListener("submit", (e) => {
    e.preventDefault();
    statusMsg.textContent = "";

    const name = kontaktForm.name.value.trim();
    const email = kontaktForm.email.value.trim();
    const betreff = kontaktForm.betreff.value.trim();
    const nachricht = kontaktForm.nachricht.value.trim();

    if (!name || !email || !betreff || !nachricht) {
      statusMsg.style.color = "red";
      statusMsg.textContent = "Bitte alle Felder ausfüllen.";
      return;
    }

    // Einfaches E-Mail-Format prüfen
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      statusMsg.style.color = "red";
      statusMsg.textContent = "Bitte eine gültige E-Mail-Adresse eingeben.";
      return;
    }

    // Hier kannst du noch einen echten Versandservice einbauen (z.B. EmailJS)

    // Bestätigung anzeigen
    statusMsg.style.color = "green";
    statusMsg.textContent = "Vielen Dank für deine Nachricht! Wir melden uns bald.";

    kontaktForm.reset();
  });
});
