// main.js

// Fonction pour vérifier la session
function checkSession(redirectIfLoggedOut = false) {
    fetch('/check-session', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(`Utilisateur connecté : ${data.username}`);
                if (redirectIfLoggedOut) {
                    window.location.href = 'dashboard.html';
                }
            } else if (redirectIfLoggedOut) {
                window.location.href = 'index.html';
            }
        });
}