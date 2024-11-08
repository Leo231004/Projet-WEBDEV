const enclosures = [
    { id: 1, name: 'les clairières', description: 'tkt ', image: 'clairières.jpg' },
    { id: 2, name: 'le bois des pains', description: 'tkt', image: 'bois.jpg' },
    { id: 3, name: 'le vallon des cascades', description: 'tkt', image: 'vallon.jpg' },
    { id: 4, name: 'le plateau', description: 'tkt', image: 'plateau.jpg' },
    { id: 5, name: 'le belvédère', description: 'tkt', image: 'belvédère.jpg' },
    { id: 6, name: 'la bergerie des reptiles', description: 'tkt', image: 'reptile.jpg' },
    // Ajouter d'autres enclos si nécessaire
];

const enclosureList = document.getElementById('enclosureList');

enclosures.forEach(enclosure => {
    const enclosureCard = document.createElement('div');
    enclosureCard.className = 'enclosure-card';
    enclosureCard.innerHTML = `
        <img src="images/${enclosure.image}" alt="${enclosure.name}">
        <h3>${enclosure.name}</h3>
        <p>${enclosure.description}</p>
        <a href="enclosure-detail-${enclosure.id}.html" class="button">Voir plus</a> 

    `;
    enclosureList.appendChild(enclosureCard);
});
