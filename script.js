// Animation au scroll
document.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.background = "#111";
    } else {
        header.style.background = "transparent";
    }
});

// Gestion du Dark Mode
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Vérifie le thème préféré de l'utilisateur (localStorage)
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
}

// Switch entre Light et Dark Mode
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Change l'icône du bouton
    if (body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark"); // Sauvegarde du thème
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "light"); // Sauvegarde du thème
    }
});

// Message de confirmation sur l'envoi du formulaire
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Merci ! Votre message a été envoyé.");
});
