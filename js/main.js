document.addEventListener('DOMContentLoaded', () => {
    // Vérifie l'état de connexion de l'utilisateur
    fetch('http://localhost:3000/check-session', { 
        method: 'GET', 
        credentials: 'include' // Inclut les cookies de session
    })
    .then(response => response.json())
    .then(data => {
        const navContainer = document.getElementById('nav-connection');
        if (data.success) {
            // Si l'utilisateur est connecté, affiche "Profil" avec les infos utilisateur
            navContainer.innerHTML = `
                <div class="profile-info">
                    <span>Bienvenue, ${data.user.username}!</span>
                    <a href="/profile.html">Profil</a>
                    <button id="logout-button">Déconnexion</button>
                </div>
            `;

            // Ajoute un gestionnaire pour le bouton "Déconnexion"
            document.getElementById('logout-button').addEventListener('click', () => {
                fetch('http://localhost:3000/logout', { method: 'GET', credentials: 'include' })
                    .then(() => window.location.reload()) // Recharge la page après déconnexion
                    .catch(err => console.error('Erreur lors de la déconnexion:', err));
            });
        } else {
            // Si l'utilisateur n'est pas connecté, affiche "Connexion"
            navContainer.innerHTML = `<a href="/login.html">Connexion</a>`;
        }
    })
    .catch(err => console.error('Erreur lors de la vérification de session:', err));
});
