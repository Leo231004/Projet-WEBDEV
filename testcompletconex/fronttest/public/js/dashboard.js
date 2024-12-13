// dashboard.js

// Vérification si l'utilisateur est connecté
window.addEventListener('DOMContentLoaded', () => checkSession(false));

// Vérification si l'utilisateur est connecté et récupération des données
document.addEventListener('DOMContentLoaded', () => {
    fetch('/profile', { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Échec de la récupération des données utilisateur');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                const { username, email } = data.user;
                document.getElementById('username').textContent = username;
                document.getElementById('email').textContent = email;
            } else {
                alert('Impossible de charger les informations utilisateur');
                window.location.href = '/index.html'; // Redirection si non connecté
            }
        })
        .catch(error => {
            console.error('Erreur lors du chargement des données utilisateur:', error);
            alert('Erreur lors du chargement du profil');
        });
});

// Gestion de la déconnexion
document.getElementById('logout-button').addEventListener('click', () => {
    fetch('/logout', { method: 'GET' })
        .then(response => {
            if (response.ok) {
                window.location.href = '/index.html';
            }
        })
        .catch(err => console.error('Erreur lors de la déconnexion:', err));
});

