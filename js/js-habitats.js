// panneau deroulant
document.addEventListener('DOMContentLoaded', () => {
    const servicesLink = document.querySelector('nav ul li a[href="services.html"]');
    const servicesDropdown = document.createElement('div');
    servicesDropdown.classList.add('services-dropdown');
    
    servicesDropdown.innerHTML = `
        <ul>
            <li><a href="billetterie.html">Billetterie</a></li>
            <li><a href="recherche.html">Pour vous reperer</a></li>
        </ul>
    `;
    
    servicesLink.parentElement.appendChild(servicesDropdown);
});

// Initialisation du carrousel lors du chargement du document
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        new Carousel(carouselContainer);
    }
});



document.addEventListener('DOMContentLoaded', () => {
    fetch('get_enclosures.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }

            // Filtrer les enclos pour ne conserver que ceux avec enclosure_id < 51
            const filteredEnclosures = data.filter(enclosure => enclosure.enclosure_id < 51);

            // Grouper les enclos par biome
            const biomes = {};
            filteredEnclosures.forEach(enclosure => {
                const biomeName = enclosure.biome_name;
                if (!biomes[biomeName]) {
                    biomes[biomeName] = {
                        name: biomeName,
                        enclosures: []
                    };
                }
                biomes[biomeName].enclosures.push(enclosure);
            });

            const biomeList = document.getElementById('biomeList');

            // Fonction pour afficher la liste des biomes
            function renderBiomes() {
                biomeList.innerHTML = ''; // Vider la liste avant de la remplir

                Object.values(biomes).forEach(biome => {
                    const biomeCard = document.createElement('div');
                    biomeCard.classList.add('enclosure-card');

                    let enclosuresHtml = '<ul>';
                    biome.enclosures.slice(0, 3).forEach(enclosure => {
                        enclosuresHtml += `
                            <li class="animal-item">
                                <strong>Enclos ${enclosure.enclosure_id}</strong> - ${enclosure.animals && enclosure.animals.length > 0 ? enclosure.animals.slice(0, 3).map(animal => `${animal.name}`).join(', ') : 'Aucun animal'}
                            </li>
                        `;
                    });
                    enclosuresHtml += '</ul>';

                    biomeCard.innerHTML = `
                        <div class="card-header">
                            <h3>Biome : ${biome.name}</h3>
                        </div>
                        <div class="animals-section">
                            <h4>Enclos :</h4>
                            ${enclosuresHtml}
                        </div>
                    `;

                    biomeList.appendChild(biomeCard);

                    // Ajouter un gestionnaire d'événement pour rendre la carte cliquable
                    biomeCard.addEventListener('click', () => {
                        renderBiomeDetails(biome);
                    });
                });
            }

            // Fonction pour afficher les enclos d'un biome spécifique
            function renderBiomeDetails(biome) {
                biomeList.innerHTML = ''; // Vider la liste

                biome.enclosures.forEach(enclosure => {
                    if (enclosure.enclosure_id < 51) {  // Filtrer pour être sûr de ne pas afficher les points d'intérêt
                        const enclosureCard = document.createElement('div');
                        enclosureCard.classList.add('enclosure-card', 'clickable');

                        let carouselHtml = '<div class="carousel">';
                        let animalInfoHtml = '<div class="animal-info-container">';

                        if (enclosure.animals && enclosure.animals.length > 0) {
                            enclosure.animals.forEach(animal => {
                                // Ajouter chaque image dans le carrousel, avec un chemin dynamique basé sur le nom de l'animal
                                const imageName = animal.name.replace(/ /g, "_");  // Remplacer les espaces par des underscores pour correspondre aux conventions de nommage des fichiers
                                carouselHtml += `
                                    <div class="carousel-item">
                                        <img src="./images/${imageName}.jpg" alt="${animal.name}" class="animal-image">
                                    </div>
                                `;
                                // Ajouter les informations des animaux sur la droite
                                animalInfoHtml += `
                                    <div class="animal-info">
                                        <h4>${animal.name}</h4>
                                        <p>${animal.description}</p>
                                    </div>
                                `;
                            });
                        } else {
                            carouselHtml += '<div class="carousel-item">Aucun animal dans cet enclos.</div>';
                        }

                        carouselHtml += '</div>';
                        animalInfoHtml += '</div>';

                        enclosureCard.innerHTML = `
                            <div class="card-header">
                                <h3>Enclos ${enclosure.enclosure_id}</h3>
                            </div>
                            <div class="enclosure-details-expanded">
                                ${carouselHtml}
                                ${animalInfoHtml}
                            </div>
                        `;

                        biomeList.appendChild(enclosureCard);

                        // Ajouter un gestionnaire de clic pour agrandir la carte et afficher le carrousel et les détails des animaux
                        enclosureCard.addEventListener('click', () => {
                            enclosureCard.classList.add('expanded');
                        });

                        // Ajouter un bouton pour fermer la vue agrandie
                        const closeButton = document.createElement('button');
                        closeButton.classList.add('close-button');
                        closeButton.textContent = 'Fermer';
                        closeButton.addEventListener('click', (event) => {
                            event.stopPropagation();
                            enclosureCard.classList.remove('expanded');
                        });
                        enclosureCard.appendChild(closeButton);
                    }
                });

                // Bouton de retour aux biomes
                const backButton = document.createElement('button');
                backButton.classList.add('back-button');
                backButton.textContent = 'Retour aux biomes';
                backButton.addEventListener('click', () => {
                    renderBiomes();
                });

                biomeList.appendChild(backButton);
            }

            // Initialement, afficher la liste des biomes
            renderBiomes();
        })
        .catch(error => console.error('Erreur lors de la récupération des enclos :', error));
});
