// Requête AJAX pour obtenir les données des enclos depuis la base de données
fetch('get_enclosures.php')
    .then(response => response.json())
    .then(enclosures => {
        if (enclosures.error) {
            console.error(enclosures.error);
            return;
        }

        const enclosureList = document.getElementById('enclosureList');
        const modal = document.getElementById('enclosureModal');
        const modalImage = modal.querySelector('.modal-image');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDescription = modal.querySelector('.modal-description');
        const modalClose = modal.querySelector('.modal-close');

        enclosures.forEach(enclosure => {
            const enclosureCard = document.createElement('div');
            enclosureCard.className = 'enclosure-card';
            enclosureCard.innerHTML = `
                <img src="images/${enclosure.image}" alt="${enclosure.name}">
                <h3>${enclosure.name}</h3>
                <p>${enclosure.description}</p>
            `;

            // Gestionnaire d'événement pour l'ouverture de la modale
            enclosureCard.addEventListener('click', () => {
                modalImage.src = `images/${enclosure.image}`;
                modalImage.alt = enclosure.name;
                modalTitle.textContent = enclosure.name;
                modalDescription.textContent = enclosure.detailed_description;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Empêche le défilement du fond
            });

            enclosureList.appendChild(enclosureCard);
        });

        // Gestionnaire d'événement pour la fermeture de la modale
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Réactive le défilement
        });

        // Fermer la modale en cliquant en dehors
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Fermer la modale avec la touche Echap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    })
    .catch(error => console.error('Erreur lors de la récupération des enclos :', error));
