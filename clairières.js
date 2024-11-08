const animal = [
    { id: 1, name: 'marabout', description: 'Home to lions, giraffes, and zebras.', image: 'marabout.jpg' },
    { id: 2, name: 'cigogne', description: 'Features monkeys, parrots, and sloths.', image: 'cigogne.jpg' },
    { id: 3, name: 'oryx algazelle', description: 'See penguins, polar bears, and arctic foxes.', image: 'oryx.jpg' },
    { id: 4, name: 'watusi', description: 'See penguins, polar bears, and arctic foxes.', image: 'watusi.jpg' },
    { id: 5, name: 'ane de somalie', description: 'See penguins, polar bears, and arctic foxes.', image: 'somalie.jpg' },
    { id: 6, name: 'yack', description: 'See penguins, polar bears, and arctic foxes.', image: 'yack.jpg' },
    { id: 7, name: 'mouton noir', description: 'See penguins, polar bears, and arctic foxes.', image: 'mouton.jpg' },
    { id: 8, name: 'bison', description: 'See penguins, polar bears, and arctic foxes.', image: 'bison.jpg' },
    { id: 9, name: 'ane de provence', description: 'See penguins, polar bears, and arctic foxes.', image: 'provence.jpg' },
    { id: 10, name: 'dromadaire', description: 'See penguins, polar bears, and arctic foxes.', image: 'dromadaire.jpg' },
    { id: 11, name: 'porc-épic', description: 'Home to lions, giraffes, and zebras.', image: 'porc.jpg' },
    { id: 12, name: 'wallaby', description: 'Features monkeys, parrots, and sloths.', image: 'wallaby.jpg' },
    { id: 13, name: 'emeu', description: 'See penguins, polar bears, and arctic foxes.', image: 'emeu.jpg' },
    { id: 14, name: 'nandou', description: 'See penguins, polar bears, and arctic foxes.', image: 'nandou.jpg' },
    { id: 15, name: 'flamant rose', description: 'See penguins, polar bears, and arctic foxes.', image: 'flamant.jpg' },
    { id: 16, name: 'tamanoir', description: 'See penguins, polar bears, and arctic foxes.', image: 'tamanoir.jpg' },
    { id: 17, name: 'tortue', description: 'See penguins, polar bears, and arctic foxes.', image: 'tortue.jpg' },
    { id: 18, name: 'pécari', description: 'See penguins, polar bears, and arctic foxes.', image: 'pécari.jpg' },
    { id: 19, name: 'ibis', description: 'See penguins, polar bears, and arctic foxes.', image: 'ibis.jpg' },
    { id: 20, name: 'lynx', description: 'See penguins, polar bears, and arctic foxes.', image: 'lynx.jpg' },
    { id: 21, name: 'serval', description: 'See penguins, polar bears, and arctic foxes.', image: 'serval.jpg' },
    { id: 22, name: 'chien des buissons', description: 'See penguins, polar bears, and arctic foxes.', image: 'chien.jpg' },
    { id: 23, name: 'tigre', description: 'See penguins, polar bears, and arctic foxes.', image: 'tigre.jpg' },
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
