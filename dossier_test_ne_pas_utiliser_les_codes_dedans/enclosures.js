document.addEventListener('DOMContentLoaded', () => {
    fetch('get_enclosures.php')
        .then(response => response.json())
        .then(enclosures => {
            if (enclosures.error) {
                console.error(enclosures.error);
                return;
            }

            const enclosureList = document.getElementById('enclosureList');
            enclosureList.innerHTML = ''; // Vider la liste avant de la remplir

            enclosures.forEach(enclosure => {
                const enclosureCard = document.createElement('div');
                enclosureCard.classList.add('enclosure-card');

                let animalsHtml = '<ul>';
                if (enclosure.animals && enclosure.animals.length > 0) {
                    enclosure.animals.forEach(animal => {
                        animalsHtml += `
                            <li class="animal-item">
                                <strong>Nom :</strong> ${animal.name}<br>
                                <span>${animal.description}</span>
                            </li>
                        `;
                    });
                } else {
                    animalsHtml += '<li>Aucun animal dans cet enclos.</li>';
                }
                animalsHtml += '</ul>';

                enclosureCard.innerHTML = `
                    <div class="card-header">
                        <h3>Enclos ${enclosure.enclosure_id}</h3>
                        <p><strong>Position :</strong> (${enclosure.position_x}, ${enclosure.position_y})</p>
                        <p><strong>Biome :</strong> ${enclosure.biome_name ? enclosure.biome_name : 'Inconnu'}</p>
                    </div>
                    <div class="animals-section">
                        <h4>Animaux dans cet enclos :</h4>
                        ${animalsHtml}
                    </div>
                `;

                enclosureList.appendChild(enclosureCard);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des enclos :', error));
});
