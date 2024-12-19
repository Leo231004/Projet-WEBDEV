document.addEventListener('DOMContentLoaded', () => {
    const biomeList = document.getElementById('biomeList'); // Conteneur des cartes de biomes
    const leaveReviewBtn = document.getElementById('leave-review-btn'); // Bouton pour laisser un avis
    const reviewCard = document.getElementById('review-card'); // Carte pour laisser un avis
    const reviewForm = document.getElementById('review-form'); // Formulaire d'avis
    const enclosureSelect = document.getElementById('enclosure-select'); // Sélecteur pour les enclos

    // Charger les données des enclos depuis le backend
    fetch('get_enclosures.php')
        .then(response => response.json())
        .then(data => {
            if (!data || data.error) {
                console.error('Erreur récupération des données:', data.error || 'Aucune donnée');
                return;
            }

            // Grouper les enclos par biome
            const biomes = {};
            data.forEach(enclosure => {
                const biomeName = enclosure.biome_name || `Biome ${enclosure.biome_id}`;
                if (!biomes[biomeName]) {
                    biomes[biomeName] = {
                        name: biomeName,
                        enclosures: []
                    };
                }
                biomes[biomeName].enclosures.push(enclosure);
            });

            // Fonction pour afficher les biomes
            function renderBiomes() {
                biomeList.innerHTML = '';
                Object.values(biomes).forEach(biome => {
                    const biomeCard = document.createElement('div');
                    biomeCard.classList.add('postcard'); // Appliquer le style postcard
                    biomeCard.classList.add('enslosure-card'); // Classe supplémentaire pour les biomes

                    let enclosuresHtml = '<ul>';
                    biome.enclosures.slice(0, 3).forEach(enclosure => {
                        enclosuresHtml += `
                            <li class="enclosure-item">
                                <strong>Enclos ${enclosure.enclosure_id}</strong> - ${
                            enclosure.animal_names && enclosure.animal_names.length > 0
                                ? enclosure.animal_names.slice(0, 3).join(', ')
                                : 'Aucun animal'
                        }
                            </li>
                        `;
                    });
                    enclosuresHtml += '</ul>';

                    biomeCard.innerHTML = `
                        <div class="postcard-header">
                            <h3>${biome.name}</h3>
                        </div>
                        <div class="postcard-content">
                            <h4>Enclos en prévisualisation :</h4>
                            ${enclosuresHtml}
                        </div>
                    `;

                    // Ajouter un gestionnaire d'événement pour afficher les enclos
                    biomeCard.addEventListener('click', () => renderBiomeDetails(biome));
                    biomeList.appendChild(biomeCard);
                });
            }

            // Fonction pour afficher les détails d'un biome
            function renderBiomeDetails(biome) {
                biomeList.innerHTML = '';

                biome.enclosures.forEach(enclosure => {
                    const enclosureCard = document.createElement('div');
                    enclosureCard.classList.add('postcard'); // Appliquer le style postcard
                    enclosureCard.classList.add('enclosure-card'); // Classe supplémentaire pour les enclos

                    let animalDetailsHtml = '<div class="animal-info">';
                    let carouselHtml = '<div class="carousel">';

                    if (enclosure.animal_names && enclosure.animal_names.length > 0) {
                        enclosure.animal_names.forEach((name, index) => {
                            const description = enclosure.animal_descriptions[index] || 'Pas de description.';
                            const imageName = name.replace(/ /g, '_');
                            carouselHtml += `
                                <div class="carousel-item">
                                    <img src="./images/${imageName}.jpg" alt="${name}" class="animal-image">
                                </div>
                            `;
                            animalDetailsHtml += `
                                <div class="animal-info-item">
                                    <h4>${name}</h4>
                                    <p>${description}</p>
                                </div>
                            `;
                        });
                    } else {
                        carouselHtml += '<div class="carousel-item">Aucun animal dans cet enclos.</div>';
                    }

                    carouselHtml += '</div>';
                    animalDetailsHtml += '</div>';

                    enclosureCard.innerHTML = `
                        <div class="postcard-header">
                            <h3>Enclos ${enclosure.enclosure_id}</h3>
                            <p class="feeding-schedule">Horaires de repas : ${enclosure.feeding_schedule || 'Non définis'}</p>
                        </div>
                        <div class="postcard-content">
                            ${carouselHtml}
                            ${animalDetailsHtml}
                        </div>
                    `;

                    biomeList.appendChild(enclosureCard);
                });

                // Bouton retour aux biomes
                const backButton = document.createElement('button');
                backButton.classList.add('back-button');
                backButton.textContent = 'Retour aux biomes';
                backButton.addEventListener('click', renderBiomes);
                biomeList.appendChild(backButton);
            }

            // Initialiser avec les biomes
            renderBiomes();
        })
        .catch(error => console.error('Erreur chargement biomes:', error));

    // Charger les enclos pour le menu déroulant
    fetch('get_enclosures.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(enclosure => {
                const option = document.createElement('option');
                option.value = enclosure.enclosure_id;
                option.textContent = `Enclos ${enclosure.enclosure_id} (${enclosure.animal_names.join(', ')})`;
                enclosureSelect.appendChild(option);
            });
        });

    // Gestion affichage formulaire d'avis
    leaveReviewBtn.addEventListener('click', () => {
        document.querySelectorAll('.postcard').forEach(card => card.style.display = 'none');
        reviewCard.classList.remove('hidden');
    });

    // Gestion soumission avis
    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const enclosureId = enclosureSelect.value;
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;

        if (!enclosureId || !rating || !comment) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        fetch('http://localhost:3000/submit-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ enclosure_id: enclosureId, rating, comment })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Avis soumis avec succès !');
                    window.location.reload();
                } else {
                    alert('Erreur : ' + data.message);
                }
            })
            .catch(error => console.error('Erreur soumission avis:', error));
    });
});
