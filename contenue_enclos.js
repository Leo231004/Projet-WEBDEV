const enclosureContenu = [
    {
        id: 1,
        name: 'Zones Humides',
        description: 'Habitat des oiseaux échassiers',
        detailedDescription: `Les zones humides représentent un écosystème crucial pour de nombreuses espèces d'oiseaux. 

        Caractéristiques principales :
        - Présence de marais et de plans d'eau
        - Végétation adaptée aux milieux aquatiques
        - Zones de nidification pour les échassiers
        
        Flore :
        - Roseaux
        - Joncs
        - Arbres adaptés aux terrains humides
        
        Faune :
        - Marabouts
        - Cigognes
        - Ibis
        
        Conservation : Écosystème sensible nécessitant une protection active`,
        image: 'cerf.jpg'
    },
    {
        id: 2,
        name: 'Prairie Africaine',
        description: 'Habitat des grands mammifères',
        detailedDescription: `La prairie africaine simulate l'environnement naturel des grands mammifères.

        Caractéristiques principales :
        - Vaste espace ouvert
        - Végétation de savane
        - Points d'eau stratégiquement placés
        
        Flore :
        - Herbes hautes
        - Quelques arbres épars
        - Arbustes caractéristiques
        
        Faune :
        - Oryx
        - Zèbres
        - Antilopes
        
        Conservation : Reproduction des conditions naturelles de vie`,
        image: 'cerf.jpg'
    }
];

const contenuList = document.getElementById('contenuList');
const modal = document.getElementById('enclosureModal');
const modalImage = modal.querySelector('.modal-image');
const modalTitle = modal.querySelector('.modal-title');
const modalDescription = modal.querySelector('.modal-description');
const modalClose = modal.querySelector('.modal-close');

// Create enclosure zone cards
enclosureContenu.forEach(contenu => {
    const contenuCard = document.createElement('div');
    contenuCard.className = 'contenu-card';
    contenuCard.innerHTML = `
        <img src="images/${contenu.image}" alt="${contenu.name}" class="contenu-image">
        <h3>${contenu.name}</h3>
        <p>${contenu.description}</p>
    `;
    
    // Modal event handler
    contenuCard.addEventListener('click', () => {
        modalImage.src = `images/${contenu.image}`;
        modalImage.alt = contenu.name;
        modalTitle.textContent = contenu.name;
        
        // Create "Voir plus" link
        const seeMoreLink = document.createElement('a');
        seeMoreLink.href = `enclosure-detail-${contenu.id}.html?contenu=${encodeURIComponent(contenu.name)}`;
        seeMoreLink.textContent = 'Voir plus';
        seeMoreLink.className = 'see-more';

        // Update modal description with detailed description and "Voir plus" link
        modalDescription.innerHTML = contenu.detailedDescription;
        modalDescription.appendChild(seeMoreLink);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    contenuList.appendChild(contenuCard);
});

// Modal close event handlers
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});