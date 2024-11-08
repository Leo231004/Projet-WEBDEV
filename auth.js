// Affiche le formulaire d'inscription lorsque le bouton "Créer un compte" est cliqué
document.getElementById('showRegisterForm').addEventListener('click', function() {
    const registerSection = document.querySelector('.register');
    const showRegisterButton = document.getElementById('showRegisterForm');
    
    // Affiche la section d'inscription et cache le bouton "Créer un compte"
    registerSection.classList.remove('hidden');
    showRegisterButton.style.display = 'none';
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    // Logique pour gérer la connexion (à connecter au backend)
    alert(`Connexion réussie pour ${username}`);
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newUsername = e.target.newUsername.value;
    const newPassword = e.target.newPassword.value;

    // Logique pour gérer l'inscription (à connecter au backend)
    alert(`Inscription réussie pour ${newUsername}`);
});
