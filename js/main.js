document.addEventListener('DOMContentLoaded', () => {
    // Vérifie l'état de connexion
    fetch('http://localhost:3000/check-session', { method: 'GET', credentials: 'include' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Si l'utilisateur est connecté, remplace le champ "Connexion" par "Profil"
                const navContainer = document.getElementById('nav-connection');
                navContainer.innerHTML = `
                    <div class="profile-info">
                        <span>Bienvenue, ${data.user.username}!</span>
                        <a href="/profile.html">Profil</a>
                        <button id="logout-button">Déconnexion</button>
                    </div>
                `;

                // Gestion de la déconnexion
                document.getElementById('logout-button').addEventListener('click', () => {
                    fetch('http://localhost:3000/logout', { method: 'GET', credentials: 'include' })
                        .then(() => {
                            window.location.reload(); // Recharge la page après déconnexion
                        });
                });
            } else {
                console.log('Utilisateur non connecté');
            }
        })
        .catch(err => console.error('Erreur lors de la vérification de session:', err));
});
