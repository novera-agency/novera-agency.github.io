// Boucherie Al-Baraka (démonstration fictive) : menu mobile et formulaire de démonstration.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = "Merci de remplir tous les champs obligatoires.";
      status.className = "form-status is-error";
      form.reportValidity();
      return;
    }
    status.textContent = "Démonstration : ce formulaire n'envoie rien. Dans un vrai site, le message partirait vers la boucherie.";
    status.className = "form-status is-success";
  });
});
