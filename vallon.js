const animal = [
    { id: 1, name: 'ara perroquet', description: 'Home to lions, giraffes, and zebras.', image: 'ara.jpg' },
    { id: 2, name: 'grand hocco', description: 'Features monkeys, parrots, and sloths.', image: 'hocco.jpg' },
    { id: 3, name: 'panthère', description: 'See penguins, polar bears, and arctic foxes.', image: 'panthère.jpg' },
    { id: 4, name: 'panda roux', description: 'See penguins, polar bears, and arctic foxes.', image: 'panda.jpg' },
    { id: 5, name: 'chèvre naine', description: 'See penguins, polar bears, and arctic foxes.', image: 'chèvre.jpg' },
    { id: 6, name: 'lémurien', description: 'See penguins, polar bears, and arctic foxes.', image: 'lémurien.jpg' },
    { id: 7, name: 'tortue', description: 'See penguins, polar bears, and arctic foxes.', image: 'tortue.jpg' },
    { id: 8, name: 'mouflon', description: 'See penguins, polar bears, and arctic foxes.', image: 'mouflon.jpg' },
    { id: 9, name: 'binturong', description: 'See penguins, polar bears, and arctic foxes.', image: 'binturong.jpg' },
    { id: 10, name: 'loutre', description: 'See penguins, polar bears, and arctic foxes.', image: 'loutre.jpg' },
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
