const animal = [
    { id: 1, name: 'macaque cabier', description: 'Home to lions, giraffes, and zebra.', image: 'macaque.jpg' },
    { id: 2, name: 'cerf', description: 'Features monkeys, parrots, and sloths.', image: 'cerf.jpg' },
    { id: 3, name: 'vautour', description: 'See penguins, polar bears, and arctic.', image: 'vautour.jpg' },
    { id: 4, name: 'antilope', description: 'See penguins, polar bears, and arctic.', image: 'antilope.jpg' },
    { id: 5, name: 'Daim', description: 'See penguins, polar bears, and arctic.', image: 'daim.jpg' },
    { id: 6, name: 'Nilgault', description: 'See penguins, polar bears, and arctic.', image: 'nilgault.jpg' },
    { id: 7, name: 'loup', description: 'See penguins, polar bears, and arctic.', image: 'loup.jpg' },
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
