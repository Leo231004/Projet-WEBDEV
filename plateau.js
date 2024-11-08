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

animal.forEach(animal => {
    const animalCard = document.createElement('div');
    animalCard.className = 'animal-card';
    animalCard.innerHTML = `
        <img src="images/${animal.image}" alt="${animal.name}"class="animal-image">
        <h3>${animal.name}</h3>
        <p>${animal.description}</p>
    `;
    animalList.appendChild(animalCard);
});
