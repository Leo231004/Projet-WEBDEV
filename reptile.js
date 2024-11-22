const animal = [
    { id: 1, name: 'python', description: 'Home to lions, giraffes, and zebras.', image: 'python.jpg' },
    { id: 2, name: 'tortue', description: 'Features monkeys, parrots, and sloths.', image: 'tortue1.jpg' },
    { id: 3, name: 'iguane', description: 'See penguins, polar bears, and arctic foxes.', image: 'iguane.jpg' },
    // Ajouter d'autres enclos si nécessaire
];

const animalList = document.getElementById('animalList');
const modal = document.getElementById('animalModal');
const modalImage = modal.querySelector('.modal-image');
const modalTitle = modal.querySelector('.modal-title');
const modalDescription = modal.querySelector('.modal-description');
const modalClose = modal.querySelector('.modal-close');

// Création des cartes d'animaux
animal.forEach(animal => {
    const animalCard = document.createElement('div');
    animalCard.className = 'animal-card';
    animalCard.innerHTML = `
        <img src="images/${animal.image}" alt="${animal.name}" class="animal-image">
        <h3>${animal.name}</h3>
        <p>${animal.description}</p>
    `;
    
    // Gestionnaire d'événement pour l'ouverture de la modale
    animalCard.addEventListener('click', () => {
        modalImage.src = `images/${animal.image}`;
        modalImage.alt = animal.name;
        modalTitle.textContent = animal.name;
        modalDescription.textContent = animal.detailedDescription;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    animalList.appendChild(animalCard);
});

// Gestionnaire d'événement pour la fermeture de la modale
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

// Fermer la modale en cliquant en dehors
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Fermer la modale avec la touche Echap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});