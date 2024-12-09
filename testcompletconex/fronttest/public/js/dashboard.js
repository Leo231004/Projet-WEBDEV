// dashboard.js

document.getElementById('logout-button').addEventListener('click', function () {
    fetch('/logout', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'index.html';
            }
        });
});

window.addEventListener('DOMContentLoaded', () => checkSession(false));