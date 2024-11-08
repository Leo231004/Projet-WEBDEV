const animal = [
    { id: 1, name: 'guépard', description: 'Home to lions, giraffes, and zebras.', image: 'guépard.jpg' },
    { id: 2, name: 'crocodile nain', description: 'Features monkeys, parrots, and sloths.', image: 'crocodile.jpg' },
    { id: 3, name: 'casoar', description: 'See penguins, polar bears, and arctic foxes.', image: 'casoar.jpg' },
    { id: 4, name: 'tapir', description: 'See penguins, polar bears, and arctic foxes.', image: 'tapir.jpg' },
    { id: 5, name: 'saïmiri', description: 'See penguins, polar bears, and arctic foxes.', image: 'saimiri.jpg' },
    { id: 6, name: 'coati', description: 'See , polar bears, and arctic foxes.', image: 'coati.jpg' },
    { id: 7, name: 'fennec', description: 'See penguins, polar bears, and arctic foxes.', image: 'fennec.jpg' },
    { id: 8, name: 'suricate', description: 'See penguins, polar bears, and arctic foxes.', image: 'suricate.jpg' },
    { id: 9, name: 'rhinocéros', description: 'See penguins, polar bears, and arctic foxes.', image: 'rhinocéros.jpg' },
    { id: 10, name: 'oryx beisa', description: 'See penguins, polar bears, and arctic foxes.', image: 'oryx.jpg' },
    { id: 11, name: 'gnou', description: 'Home to lions, giraffes, and zebras.', image: 'gnou.jpg' },
    { id: 12, name: 'autruche', description: 'Features monkeys, parrots, and sloths.', image: 'autruche.jpg' },
    { id: 13, name: 'antilope cervicapre', description: 'See penguins, polar bears, and arctic foxes.', image: 'antilope.jpg' },
    // Ajouter d'autres enclos si nécessaire
];

const animalList = document.getElementById('animalList');

animal.forEach(animal => {
    const animalCard = document.createElement('div');
    animalCard.className = 'animal-card';
    animalCard.innerHTML = `
        <img src="images/${animal.image}" alt="${animal.name}" class="animal-image">
        <h3>${animal.name}</h3>
        <p>${animal.description}</p>
    `;
    animalList.appendChild(animalCard);
});
