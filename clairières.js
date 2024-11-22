const animal = [
    {
        id: 1,
        name: 'Marabout',
        description: 'Un grand échassier d`Afrique',
        detailedDescription: `Le Marabout d'Afrique est l'un des plus grands oiseaux volants du monde. 
        Cet échassier impressionnant peut atteindre une hauteur de 1,5 mètre et une envergure de 3 mètres.
        
        Caractéristiques principales :
        - Tête et cou déplumés caractéristiques
        - Grande poche gulaire sous le bec
        - Excellent planeur utilisant les courants thermiques
        
        Comportement :
        - Charognard opportuniste
        - Niche en colonies dans les arbres
        - Très territorial pendant la période de reproduction
        
        Conservation : Espèce non menacée mais surveillée`,
        image: 'marabout.jpg'
    },
    {
        id: 2,
        name: 'Cigogne',
        description: 'Échassier migrateur emblématique',
        detailedDescription: `La Cigogne blanche est un grand échassier migrateur, symbole de nombreuses régions d'Europe. 
        
        Caractéristiques principales :
        - Plumage blanc avec les ailes noires
        - Long bec rouge-orangé
        - Pattes rouges caractéristiques
        
        Comportement :
        - Migration spectaculaire entre l'Europe et l'Afrique
        - Niche sur les toits et les pylônes
        - Claquement de bec caractéristique pour communiquer
        
        Conservation : Population en augmentation grâce aux mesures de protection`,
        image: 'cigogne.jpg'
    },
    { id: 3, name: 'oryx algazelle', description: 'See penguins, polar bears, and arctic foxes.', image: 'oryx_algazelle.jpg' },
    { id: 4, name: 'watusi', description: 'See penguins, polar bears, and arctic foxes.', image: 'watusi.jpg' },
    { id: 5, name: 'ane de somalie', description: 'See penguins, polar bears, and arctic foxes.', image: 'ane_de_somalie.jpg' },
    { id: 6, name: 'yack', description: 'See penguins, polar bears, and arctic foxes.', image: 'yack.jpg' },
    { id: 7, name: 'mouton noir', description: 'See penguins, polar bears, and arctic foxes.', image: 'mouton_noir.jpg' },
    { id: 8, name: 'bison', description: 'See penguins, polar bears, and arctic foxes.', image: 'bison.jpg' },
    { id: 9, name: 'ane de provence', description: 'See penguins, polar bears, and arctic foxes.', image: 'ane_de_provence.jpg' },
    { id: 10, name: 'dromadaire', description: 'See penguins, polar bears, and arctic foxes.', image: 'dromadaire.jpg' },
    { id: 11, name: 'porc-épic', description: 'Home to lions, giraffes, and zebras.', image: 'porc_épic.jpg' },
    { id: 12, name: 'wallaby', description: 'Features monkeys, parrots, and sloths.', image: 'wallaby.jpg' },
    { id: 13, name: 'emeu', description: 'See penguins, polar bears, and arctic foxes.', image: 'emeu.jpg' },
    { id: 14, name: 'nandou', description: 'See penguins, polar bears, and arctic foxes.', image: 'nandou.jpg' },
    { id: 15, name: 'flamant rose', description: 'See penguins, polar bears, and arctic foxes.', image: 'flamant_rose.jpg' },
    { id: 16, name: 'tamanoir', description: 'See penguins, polar bears, and arctic foxes.', image: 'tamanoir.jpg' },
    { id: 17, name: 'tortue', description: 'See penguins, polar bears, and arctic foxes.', image: 'tortue.jpg' },
    { id: 18, name: 'pécari', description: 'See penguins, polar bears, and arctic foxes.', image: 'pécari.jpg' },
    { id: 19, name: 'ibis', description: 'See penguins, polar bears, and arctic foxes.', image: 'ibis.jpg' },
    { id: 20, name: 'lynx', description: 'See penguins, polar bears, and arctic foxes.', image: 'lynx.jpg' },
    { id: 21, name: 'serval', description: 'See penguins, polar bears, and arctic foxes.', image: 'serval.jpg' },
    { id: 22, name: 'chien des buissons', description: 'See penguins, polar bears, and arctic foxes.', image: 'chien_des_buissons.jpg' },
    { id: 23, name: 'tigre', description: 'See penguins, polar bears, and arctic foxes.', image: 'tigre.jpg' },
    // Continuer avec les autres animaux de la même manière...
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