// Fonction pour créer les panneaux déroulants
function createAccordion(data) {
    const accordion = document.createElement('div');
    accordion.classList.add('accordion');
  
    const header = document.createElement('div');
    header.classList.add('accordion-header');
  
    const title = document.createElement('h3');
    title.textContent = data.name;
  
    const arrow = document.createElement('span');
    arrow.classList.add('accordion-arrow');
    arrow.textContent = '+';
  
    header.appendChild(title);
    header.appendChild(arrow);
  
    const content = document.createElement('div');
    content.classList.add('accordion-content');
  
    const description = document.createElement('p');
    description.textContent = data.detailedDescription;
  
    content.appendChild(description);
  
    accordion.appendChild(header);
    accordion.appendChild(content);
  
    header.addEventListener('click', () => {
      content.style.display = content.style.display === 'none' ? 'block' : 'none';
      arrow.textContent = content.style.display === 'none' ? '+' : '-';
    });
  
    return accordion;
}
  
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
    
    updateCarousel() {
        // Déplacer le carrousel
        const offset = -this.currentSlide * 100;
        this.slides.style.transform = `translateX(${offset}%)`;
        
        // Mettre à jour les points de navigation
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50;
        if (startX - endX > threshold) {
            this.nextSlide();
        } else if (endX - startX > threshold) {
            this.prevSlide();
        }
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Initialisation du carrousel lors du chargement du document
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        new Carousel(carouselContainer);
    }
});



document.addEventListener('DOMContentLoaded', () => {
    fetch('get_enclosures.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }

            // Filtrer les enclos pour ne conserver que ceux avec enclosure_id < 51
            const filteredEnclosures = data.filter(enclosure => enclosure.enclosure_id < 51);

            // Grouper les enclos par biome
            const biomes = {};
            filteredEnclosures.forEach(enclosure => {
                const biomeName = enclosure.biome_name;
                if (!biomes[biomeName]) {
                    biomes[biomeName] = {
                        name: biomeName,
                        enclosures: []
                    };
                }
                biomes[biomeName].enclosures.push(enclosure);
            });

            const biomeList = document.getElementById('biomeList');

            // Fonction pour afficher la liste des biomes
            function renderBiomes() {
                biomeList.innerHTML = ''; // Vider la liste avant de la remplir

                Object.values(biomes).forEach(biome => {
                    const biomeCard = document.createElement('div');
                    biomeCard.classList.add('enclosure-card');

                    let enclosuresHtml = '<ul>';
                    biome.enclosures.slice(0, 3).forEach(enclosure => {
                        enclosuresHtml += `
                            <li class="animal-item">
                                <strong>Enclos ${enclosure.enclosure_id}</strong> - ${enclosure.animals && enclosure.animals.length > 0 ? enclosure.animals.slice(0, 3).map(animal => `${animal.name}`).join(', ') : 'Aucun animal'}
                            </li>
                        `;
                    });
                    enclosuresHtml += '</ul>';

                    biomeCard.innerHTML = `
                        <div class="card-header">
                            <h3>Biome : ${biome.name}</h3>
                        </div>
                        <div class="animals-section">
                            <h4>Enclos :</h4>
                            ${enclosuresHtml}
                        </div>
                    `;

                    biomeList.appendChild(biomeCard);

                    // Ajouter un gestionnaire d'événement pour rendre la carte cliquable
                    biomeCard.addEventListener('click', () => {
                        renderBiomeDetails(biome);
                    });
                });
            }

            // Fonction pour afficher les enclos d'un biome spécifique
            function renderBiomeDetails(biome) {
                biomeList.innerHTML = ''; // Vider la liste

                biome.enclosures.forEach(enclosure => {
                    if (enclosure.enclosure_id < 51) {  // Filtrer pour être sûr de ne pas afficher les points d'intérêt
                        const enclosureCard = document.createElement('div');
                        enclosureCard.classList.add('enclosure-card', 'clickable');

                        let carouselHtml = '<div class="carousel">';
                        let animalInfoHtml = '<div class="animal-info-container">';

                        if (enclosure.animals && enclosure.animals.length > 0) {
                            enclosure.animals.forEach(animal => {
                                // Ajouter chaque image dans le carrousel, avec un chemin dynamique basé sur le nom de l'animal
                                const imageName = animal.name.replace(/ /g, "_");  // Remplacer les espaces par des underscores pour correspondre aux conventions de nommage des fichiers
                                carouselHtml += `
                                    <div class="carousel-item">
                                        <img src="./images/${imageName}.jpg" alt="${animal.name}" class="animal-image">
                                    </div>
                                `;
                                // Ajouter les informations des animaux sur la droite
                                animalInfoHtml += `
                                    <div class="animal-info">
                                        <h4>${animal.name}</h4>
                                        <p>${animal.description}</p>
                                    </div>
                                `;
                            });
                        } else {
                            carouselHtml += '<div class="carousel-item">Aucun animal dans cet enclos.</div>';
                        }

                        carouselHtml += '</div>';
                        animalInfoHtml += '</div>';

                        enclosureCard.innerHTML = `
                            <div class="card-header">
                                <h3>Enclos ${enclosure.enclosure_id}</h3>
                            </div>
                            <div class="enclosure-details-expanded">
                                ${carouselHtml}
                                ${animalInfoHtml}
                            </div>
                        `;

                        biomeList.appendChild(enclosureCard);

                        // Ajouter un gestionnaire de clic pour agrandir la carte et afficher le carrousel et les détails des animaux
                        enclosureCard.addEventListener('click', () => {
                            enclosureCard.classList.add('expanded');
                        });

                        // Ajouter un bouton pour fermer la vue agrandie
                        const closeButton = document.createElement('button');
                        closeButton.classList.add('close-button');
                        closeButton.textContent = 'Fermer';
                        closeButton.addEventListener('click', (event) => {
                            event.stopPropagation();
                            enclosureCard.classList.remove('expanded');
                        });
                        enclosureCard.appendChild(closeButton);
                    }
                });

                // Bouton de retour aux biomes
                const backButton = document.createElement('button');
                backButton.classList.add('back-button');
                backButton.textContent = 'Retour aux biomes';
                backButton.addEventListener('click', () => {
                    renderBiomes();
                });

                biomeList.appendChild(backButton);
            }

            // Initialement, afficher la liste des biomes
            renderBiomes();
        })
        .catch(error => console.error('Erreur lors de la récupération des enclos :', error));
});


// panneau deroulant
document.addEventListener('DOMContentLoaded', () => {
    const servicesLink = document.querySelector('nav ul li a[href="services.html"]');
    const servicesDropdown = document.createElement('div');
    servicesDropdown.classList.add('services-dropdown');
    
    servicesDropdown.innerHTML = `
        <ul>
            <li><a href="billetterie.html">Billetterie</a></li>
        </ul>
    `;
    
    servicesLink.parentElement.appendChild(servicesDropdown);
});

//billet

document.addEventListener('DOMContentLoaded', function() {
    const adultInput = document.querySelector('.ticket-type-grid .ticket-type-card:nth-child(1) .quantity-input');
    const childInput = document.querySelector('.ticket-type-grid .ticket-type-card:nth-child(2) .quantity-input');
    const babyInput = document.querySelector('.ticket-type-grid .ticket-type-card:nth-child(3) .quantity-input');
    const adultsTotal = document.getElementById('adults-total');
    const childrenTotal = document.getElementById('children-total');
    const grandTotal = document.getElementById('grand-total');
    const ticketForm = document.querySelector('.ticket-form');

    function updateQuantity(input, isPlus) {
        let currentValue = parseInt(input.value);
        if (isPlus && currentValue < 10) {
            input.value = currentValue + 1;
        } else if (!isPlus && currentValue > 0) {
            input.value = currentValue - 1;
        }
        calculateTotal();
    }

    function calculateTotal() {
        const adultPrice = 22;
        const childPrice = 15;
        const adultCount = parseInt(adultInput.value);
        const childCount = parseInt(childInput.value);

        const adultsTotalValue = adultCount * adultPrice;
        const childrenTotalValue = childCount * childPrice;
        const total = adultsTotalValue + childrenTotalValue;

        adultsTotal.textContent = `${adultsTotalValue}€`;
        childrenTotal.textContent = `${childrenTotalValue}€`;
        grandTotal.textContent = `${total}€`;
    }

    // Quantity buttons
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.quantity-input');
            updateQuantity(input, true);
        });
    });

    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.quantity-input');
            updateQuantity(input, false);
        });
    });

    // Form submission
    ticketForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Basic validation
        const totalTickets = 
            parseInt(adultInput.value) + 
            parseInt(childInput.value) + 
            parseInt(babyInput.value);
        
        const visitDate = document.getElementById('visit-date').value;

        if (totalTickets === 0) {
            alert('Veuillez sélectionner au moins un billet.');
            return;
        }

        if (!visitDate) {
            alert('Veuillez sélectionner une date de visite.');
            return;
        }

        // Here you would typically send the data to a server
        alert('Réservation en cours de traitement...');
    });
});