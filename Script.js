document.addEventListener('DOMContentLoaded', function() {
    // =========================================================================
    // Gestion du menu mobile (hamburger)
    // =========================================================================
    
    // Sélection des éléments du menu hamburger
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    // Événement pour afficher/masquer le menu mobile
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            // Bascule la classe 'active' pour afficher ou cacher le menu
            navLinks.classList.toggle('active');
            // Met à jour l'attribut aria-expanded pour l'accessibilité
            hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    // =========================================================================
    // Défilement fluide pour les liens d'ancrage
    // =========================================================================
    
    // Sélection de tous les liens commençant par '#'
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le saut instantané par défaut

            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignore les liens vides

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Défilement fluide vers l'élément cible avec un décalage pour la barre de navigation
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Ferme le menu mobile si ouvert
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // =========================================================================
    // Gestion des onglets pour la section BTS SIO
    // =========================================================================
    
    // Sélection des boutons et contenus des onglets
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Ajout d'un événement pour chaque bouton d'onglet
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Désactive tous les boutons et contenus
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Active le bouton cliqué et le contenu correspondant
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // =========================================================================
    // Animations au défilement
    // =========================================================================
    
    // Fonction pour animer les éléments lorsqu'ils entrent dans la vue
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section, .project-card, .skill-category, .option-card, .cta-button');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // Anime l'élément si visible dans la fenêtre
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialisation des éléments à animer
    const animatedElements = document.querySelectorAll('.section, .project-card, .skill-category, .option-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Ajout de l'écouteur pour le défilement
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécute une première fois au chargement

    // =========================================================================
    // Effet de machine à écrire pour la section hero
    // =========================================================================
    
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const text = "Développeur FullStack"; // Texte à afficher
        let index = 0;

        function type() {
            if (index < text.length) {
                // Affiche le texte lettre par lettre avec un curseur
                heroTagline.innerHTML = text.substring(0, index + 1) + '<span class="typing-cursor">|</span>';
                index++;
                setTimeout(type, 100);
            } else {
                // Fait clignoter le curseur une fois le texte complet
                setInterval(() => {
                    const cursor = document.querySelector('.typing-cursor');
                    if (cursor) {
                        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                    }
                }, 500);
            }
        }

        // Démarre l'effet après un délai
        setTimeout(type, 1000);
    }

    // =========================================================================
    // Gestion du carrousel pour la section veille
    // =========================================================================
    
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    if (carousel && carouselItems.length > 0) {
        let currentIndex = 0;
        const itemCount = carouselItems.length;

        // Création des indicateurs de carrousel
        carouselItems.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });

        const indicators = document.querySelectorAll('.carousel-indicator');

        // Met à jour la position du carrousel et les indicateurs
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        // Navigue vers une diapositive spécifique
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        // Passe à la diapositive suivante
        function nextSlide() {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        }

        // Passe à la diapositive précédente
        function prevSlide() {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            updateCarousel();
        }

        // Écouteurs pour les boutons de navigation
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Défilement automatique du carrousel
        let carouselInterval = setInterval(nextSlide, 5000);

        // Pause au survol
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(carouselInterval);
            });

            carouselContainer.addEventListener('mouseleave', () => {
                carouselInterval = setInterval(nextSlide, 5000);
            });
        }
    }
});