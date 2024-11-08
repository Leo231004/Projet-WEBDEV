const enclosures = [
    { id: 1, name: 'Savannah Habitat', animals: ['Lion', 'Giraffe', 'Zebra'] },
    { id: 2, name: 'Rainforest Habitat', animals: ['Monkey', 'Parrot', 'Sloth'] },
    { id: 3, name: 'Arctic Habitat', animals: ['Penguin', 'Polar Bear', 'Arctic Fox'] },
];

function searchAnimal() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const results = enclosures.filter(enclosure =>
        enclosure.animals.some(animal => animal.toLowerCase().includes(input))
    );

    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (results.length > 0) {
        results.forEach(enclosure => {
            const enclosureElement = document.createElement('div');
            enclosureElement.className = 'enclosure-result';
            enclosureElement.innerHTML = `
                <h3>${enclosure.name}</h3>
                <p>Animaux: ${enclosure.animals.join(', ')}</p>
            `;
            resultsContainer.appendChild(enclosureElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>Aucun enclos trouvé pour cet animal.</p>';
    }
}
