document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si l'utilisateur est admin via /check-admin
    fetch('http://localhost:3000/check-admin', {
        method: 'GET',
        credentials: 'include' // Inclure les cookies pour les sessions
    })
    .then(response => response.json())
    .then(data => {
        const welcomeMessage = document.getElementById('welcome-message');

        if (data.success && data.role === 'admin') {
            console.log('Administrateur connecté :', data.username);
            if (welcomeMessage) {
                welcomeMessage.textContent = `Bienvenue, Administrateur ${data.username}`;
            }
        } else {
            console.warn('Accès interdit.');
            alert("Accès refusé. Vous devez être administrateur.");
            window.location.href = 'acceuil.html';
        }
    })
    .catch(err => {
        console.error('Erreur lors de la vérification de l\'administration :', err);
        alert("Erreur serveur. Veuillez réessayer.");
        window.location.href = 'acceuil.html';
    });

    setupAdminFeatures();
});


// Fonctionnalités admin : Mettre à jour les horaires de nourrissage
function setupAdminFeatures() {
    const feedingScheduleForm = document.getElementById('feeding-schedule-form');
    feedingScheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const enclosure_id = document.getElementById('enclosure-id').value;
        const feeding_schedule = document.getElementById('feeding-schedule').value;

        fetch('http://localhost:3000/admin/update-feeding-schedule', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ enclosure_id, feeding_schedule })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(err => console.error('Erreur mise à jour horaires :', err));
    });

    // Déplacer un animal
    const moveAnimalForm = document.getElementById('move-animal-form');
    moveAnimalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const animal_id = document.getElementById('animal-id').value;
        const new_enclosure_id = document.getElementById('new-enclosure-id').value;

        fetch('http://localhost:3000/admin/move-animal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ animal_id, new_enclosure_id })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(err => console.error('Erreur déplacement animal :', err));
    });
}
