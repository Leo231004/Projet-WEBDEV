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
