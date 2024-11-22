const enclosures = [
    {
        id: 1,
        name: 'Les Clairières',
        description: 'Un espace paisible bordé d\'arbres où vous pourrez observer nos cerfs et biches en liberté.',
        detailedDescription: `Les Clairières constituent un vaste espace naturel de 5 hectares où nos cerfs et biches évoluent en semi-liberté. 
        Cet environnement a été spécialement aménagé pour reproduire leur habitat naturel, avec des zones boisées et des espaces dégagés.
        
        Les visiteurs peuvent observer ces magnifiques animaux depuis plusieurs points d'observation stratégiquement placés, 
        offrant une vue imprenable sur leur comportement naturel. Au printemps, vous pourrez peut-être avoir la chance 
        d'apercevoir les faons qui font leurs premiers pas dans les clairières.
        
        Horaires de nourrissage : 10h30 et 16h00
        Espèces présentes : Cerfs élaphes, Biches, Daims
        Superficie : 5 hectares`,
        image: 'clairières.jpg'
    },
    {
        id: 2,
        name: 'Le Bois des Pains',
        description: 'Une forêt dense abritant nos ours bruns et nos loups gris.',
        detailedDescription: `Le Bois des Pains est notre plus grand espace forestier, couvrant 8 hectares de forêt dense. 
        Cet habitat naturel abrite nos ours bruns et nos meutes de loups gris, séparés par des zones distinctes.
        
        L'enclos des ours comprend des points d'eau, des zones d'escalade et des espaces d'enrichissement où ils peuvent 
        chercher leur nourriture. Les loups évoluent dans un territoire comprenant des zones rocheuses et boisées, 
        permettant d'observer leur dynamique de meute.
        
        Des passerelles surélevées permettent aux visiteurs d'observer ces prédateurs en toute sécurité, 
        tout en ayant une vue d'ensemble sur leur territoire.
        
        Horaires de nourrissage des ours : 11h00 et 15h30
        Horaires de nourrissage des loups : 14h00
        Espèces présentes : Ours bruns d'Europe, Loups gris
        Superficie : 8 hectares`,
        image: 'bois.jpg'
    },
    {
        id: 3,
        name: 'Le Vallon des Cascades',
        description: 'Un environnement aquatique pour nos loutres et castors.',
        detailedDescription: `Le Vallon des Cascades est un écosystème aquatique complexe comprenant plusieurs bassins 
        et cours d'eau naturels. Les loutres et les castors y ont chacun leur territoire, parfaitement adapté à leurs besoins.
        
        Les loutres disposent de bassins profonds avec des courants variables et des zones de jeux. Les castors ont 
        construit leurs propres barrages et loges, démontrant leurs impressionnantes capacités d'ingénieurs de la nature.
        
        Des vitres subaquatiques permettent d'observer les animaux aussi bien sous l'eau qu'en surface, offrant 
        un spectacle fascinant de leur vie quotidienne.
        
        Horaires de nourrissage des loutres : 11h30 et 16h30
        Activité des castors : Plus visible au crépuscule
        Espèces présentes : Loutres d'Europe, Castors d'Eurasie
        Superficie : 3 hectares`,
        image: 'vallon.jpg'
    },
    {
        id: 4,
        name: 'Le Plateau',
        description: 'Une vaste plaine pour nos herbivores d\'Afrique.',
        detailedDescription: `Le Plateau est notre reconstitution d'une savane africaine, offrant un espace ouvert de 6 hectares 
        où cohabitent plusieurs espèces d'herbivores. Cette zone est particulièrement impressionnante avec sa végétation adaptée 
        et ses points d'eau.
        
        Les zèbres, antilopes et girafes partagent cet espace comme ils le feraient dans leur habitat naturel. Des barrières 
        naturelles et des fossés invisibles permettent aux visiteurs d'avoir une vue dégagée sur les animaux tout en 
        garantissant leur sécurité.
        
        Un point d'observation surélevé permet d'admirer l'ensemble du plateau et d'observer les interactions entre les différentes espèces.
        
        Horaires de nourrissage : Tout au long de la journée
        Espèces présentes : Zèbres de Grévy, Antilopes rouannes, Girafes de Rothschild
        Superficie : 6 hectares`,
        image: 'plateau.jpg'
    },
    {
        id: 5,
        name: 'Le Belvédère',
        description: 'Un habitat en hauteur pour nos grands singes.',
        detailedDescription: `Le Belvédère est notre complexe spécialement conçu pour les primates, comprenant des structures 
        verticales allant jusqu'à 15 mètres de haut. Cet espace reproduit les différentes strates d'une forêt tropicale.
        
        Les orangs-outans et les gibbons disposent de nombreuses structures de grimpe, de plateformes d'observation et de 
        zones de repos en hauteur. Des cordes, des filets et des ponts suspendus leur permettent de se déplacer comme 
        ils le feraient dans leur habitat naturel.
        
        Les visiteurs peuvent observer les primates depuis plusieurs niveaux, y compris une passerelle située à mi-hauteur 
        offrant une perspective unique sur leur comportement.
        
        Horaires des enrichissements : 10h00, 14h30 et 16h00
        Espèces présentes : Orangs-outans de Bornéo, Gibbons à mains blanches
        Superficie : 2 hectares`,
        image: 'belvédère.jpg'
    },
    {
        id: 6,
        name: 'La Bergerie des Reptiles',
        description: 'Un espace climatisé pour nos reptiles et amphibiens.',
        detailedDescription: `La Bergerie des Reptiles est notre bâtiment climatisé dédié aux reptiles et amphibiens. 
        Chaque terrarium reproduit fidèlement l'habitat naturel de ses occupants, avec un contrôle précis de la température 
        et de l'humidité.
        
        Les visiteurs peuvent découvrir une grande diversité d'espèces, des pythons impressionnants aux minuscules 
        grenouilles dendrobates. Chaque espace est équipé d'un éclairage spécial reproduisant le cycle jour/nuit naturel 
        des animaux.
        
        Des panneaux interactifs permettent d'en apprendre davantage sur chaque espèce, leur mode de vie et leur 
        statut de conservation.
        
        Horaires des nourrissages publics : Mercredi et Samedi à 15h00
        Espèces présentes : Pythons réticulés, Iguanes verts, Dendrobates, Caméléons
        Surface d'exposition : 800 m²
        Température maintenue : 24-28°C selon les zones`,
        image: 'reptile.jpg'
    }
];

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
        modalDescription.textContent = enclosure.detailedDescription;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêche le défilement du fond

        // Ajout du lien "Voir plus" à la description de la modale
        const seeMoreLink = document.createElement('a');
        seeMoreLink.href = `contenue_enclos.html?enclosure=${encodeURIComponent(enclosure.name)}`;
        seeMoreLink.textContent = 'Voir plus';
        seeMoreLink.className = 'see-more';

        // Mise à jour du contenu de la description avant d'ajouter le lien
        modalDescription.innerHTML = enclosure.detailedDescription;
        modalDescription.appendChild(seeMoreLink);
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