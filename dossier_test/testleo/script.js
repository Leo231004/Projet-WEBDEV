function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.backgroundColor = 'white';
    }
}

// Animation des cartes d'animaux
function initAnimalCardsAnimation() {
    const animalCards = document.querySelectorAll('.animal-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animalCards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
}

// Carrousel des animaux emblématiques
class Carousel {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelector('.carousel-slides');
        this.slideElements = container.querySelectorAll('.carousel-slide');
        this.currentSlide = 0;
        this.totalSlides = this.slideElements.length;
        
        // Création des points de navigation
        this.createDots();
        
        // Ajout des événements
        this.bindEvents();
        
        // Démarrage du défilement automatique
        this.startAutoPlay();
        
        // Mise à jour initiale
        this.updateCarousel();
    }
    
    createDots() {
        const dotsContainer = this.container.querySelector('.carousel-dots');
        
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        this.dots = dotsContainer.querySelectorAll('.carousel-dot');
    }
    
    bindEvents() {
        // Boutons précédent/suivant
        this.container.querySelector('.prev').addEventListener('click', () => this.prevSlide());
        this.container.querySelector('.next').addEventListener('click', () => this.nextSlide());
        
        // Pause du défilement automatique au survol
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Gestion du swipe sur mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50;
        if (startX - endX > threshold) {
            this.nextSlide();
        } else if (endX - startX >