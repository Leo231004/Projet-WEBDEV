// dashboard.js

// Vérification si l'utilisateur est connecté
window.addEventListener('DOMContentLoaded', () => checkSession(false));

document.getElementById('logout-button').addEventListener('click', function () {
    fetch('/logout', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'index.html';
            }
        });
});
