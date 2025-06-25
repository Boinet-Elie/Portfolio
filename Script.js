// script.js

// Lorsque le DOM est complètement chargé, exécute le script
document.addEventListener('DOMContentLoaded', function() {

    // ====== MENU MOBILE (HAMBURGER) ======

    // Récupère le bouton hamburger et le conteneur de liens de navigation
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    // Au clic sur le bouton hamburger
    hamburger.addEventListener('click', function() {
        // Bascule la classe "active" sur le menu pour l'afficher ou le cacher
        navLinks.classList.toggle('active');

        // Met à jour l'attribut aria-expanded pour l'accessibilité
        hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // ====== DÉFILEMENT FLUIDE POUR LES ANCRES ======

    // Sélectionne tous les liens qui commencent par un #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Empêche le comportement par défaut (saut instantané)
            e.preventDefault();

            // Récupère l'identifiant de l'ancre (ex: #section1)
            const targetId = this.getAttribute('href');

            // Ignore si c’est juste "#"
            if (targetId === '#') return;

            // Cherche l’élément correspondant à l’ancre
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Fait défiler la page en douceur jusqu’à l’élément ciblé
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Décale de 80px (ex: pour compenser une barre de navigation fixe)
                    behavior: 'smooth' // Défilement fluide
                });

                // Si le menu mobile est ouvert, le refermer automatiquement
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // ====== ONGLET POUR LA SECTION BTS SIO ======

    // Sélectionne tous les boutons d'onglet
    const tabButtons = document.querySelectorAll('.tab-button');

    // Sélectionne toutes les zones de contenu d'onglet
    const tabContents = document.querySelectorAll('.tab-content');

    // Ajoute un écouteur à chaque bouton d’onglet
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Récupère la valeur de l’attribut data-tab (ex: "slam", "sisr")
            const tabId = this.getAttribute('data-tab');

            // Supprime la classe active de tous les boutons et contenus
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Ajoute la classe active uniquement au bouton cliqué et au contenu associé
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // ====== ANIMATIONS AU DÉFILEMENT ======

    // Fonction pour animer les éléments lorsqu’ils entrent dans la vue
    const animateOnScroll = function() {
        // Sélectionne tous les éléments à animer
        const elements = document.querySelectorAll('.section, .project-card, .skill-category, .option-card');

        // Pour chaque élément
        elements.forEach(element => {
            // Récupère sa position par rapport au haut de la fenêtre visible
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // Si l’élément est suffisamment visible
            if (elementPosition < windowHeight - 100) {
                // Rétablit l'opacité et la position pour le faire apparaître en fondu + translation
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialisation des éléments à animer : position de départ invisible + décalée
    const animatedElements = document.querySelectorAll('.section, .project-card, .skill-category, .option-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0'; // Invisible au départ
        element.style.transform = 'translateY(20px)'; // Légèrement décalé vers le bas
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Transition douce
    });

    // Ajoute un écouteur d’événement sur le scroll
    window.addEventListener('scroll', animateOnScroll);

    // Exécute une première fois à l’ouverture de la page
    animateOnScroll();

    // ====== EFFET MACHINE À ÉCRIRE DANS LE HERO ======

    // Sélectionne l’élément contenant le texte animé (ex: slogan)
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const text = "Développeur FullStack"; // Texte à écrire
        let index = 0; // Index du caractère actuel

        // Fonction récursive pour écrire lettre par lettre
        function type() {
            if (index < text.length) {
                // Affiche le texte partiel + curseur clignotant
                heroTagline.innerHTML = text.substring(0, index + 1) + '<span class="typing-cursor">|</span>';
                index++;

                // Appelle la fonction de nouveau après 100 ms
                setTimeout(type, 100);
            } else {
                // Une fois le texte complet, fait clignoter le curseur
                setInterval(() => {
                    const cursor = document.querySelector('.typing-cursor');
                    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                }, 500);
            }
        }

        // Démarre l'effet après un court délai (1 seconde)
        setTimeout(type, 1000);
    }
});