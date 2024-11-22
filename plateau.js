const animal = [
    { id: 1, name: 'lion', description: 'Home to lions, giraffes, and zebras.', image: 'lion.jpg' },
    { id: 2, name: 'girafe', description: 'Features monkeys, parrots, and sloths.', image: 'girafe.jpg' },
    { id: 3, name: 'zèbre', description: 'See penguins, polar bears, and arctic foxes.', image: 'zèbre.jpg' },
    { id: 4, name: 'hipopotame', description: 'See penguins, polar bears, and arctic foxes.', image: 'hipopotame.jpg' },
    { id: 5, name: 'hyène', description: 'See penguins, polar bears, and arctic foxes.', image: 'hyène.jpg' },
    { id: 6, name: 'loup à crinière', description: 'See penguins, polar bears, and arctic foxes.', image: 'loup.jpg' },
    { id: 7, name: 'éléphant', description: 'See penguins, polar bears, and arctic foxes.', image: 'éléphant.jpg' },
    { id: 8, name: 'varan de komodo', description: 'See penguins, polar bears, and arctic foxes.', image: 'varan.jpg' },
    { id: 9, name: 'grivet cercopithèque', description: 'See penguins, polar bears, and arctic foxes.', image: 'grivet.jpg' },
    { id: 10, name: 'ouistiti gibbon', description: 'See penguins, polar bears, and arctic foxes.', image: 'ouistiti.jpg' },
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
