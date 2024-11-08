const animal = [
    { id: 1, name: 'python', description: 'Home to lions, giraffes, and zebras.', image: 'python.jpg' },
    { id: 2, name: 'tortue', description: 'Features monkeys, parrots, and sloths.', image: 'tortue1.jpg' },
    { id: 3, name: 'iguane', description: 'See penguins, polar bears, and arctic foxes.', image: 'iguane.jpg' },
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
