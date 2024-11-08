const services = [
    { name: 'Restaurant La Savane', description: 'Restauration rapide avec vue sur la savane.' },
    { name: 'Boutique Souvenirs', description: 'Achats de souvenirs et de produits dérivés.' },
    { name: 'Aire de jeux', description: 'Aire de jeux pour les enfants.' },
];

const serviceList = document.getElementById('serviceList');

services.forEach(service => {
    const serviceItem = document.createElement('div');
    serviceItem.className = 'service-item';
    serviceItem.innerHTML = `
        <h3>${service.name}</h3>
        <p>${service.description}</p>
    `;
    serviceList.appendChild(serviceItem);
});
