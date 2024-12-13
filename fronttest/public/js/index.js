// Événement qui se déclenche lorsque la page est complètement chargée
window.addEventListener('DOMContentLoaded', () => checkSession(true)); // Appelle la fonction checkSession pour vérifier si l'utilisateur est déjà connecté

// Gestion de l'envoi du formulaire de connexion
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche l'envoi normal du formulaire pour pouvoir le traiter en JavaScript

    // Création d'un objet FormData qui permet d'extraire facilement les données du formulaire
    const formData = new FormData(e.target);
    
    // Création d'un objet contenant les données de connexion
    const loginData = {
        username: formData.get('username'), // Récupère le nom d'utilisateur
        password: formData.get('password')  // Récupère le mot de passe
    };

    // Envoi d'une requête POST au serveur pour essayer de connecter l'utilisateur
    fetch('/login', {
        method: 'POST', // Utilisation de la méthode POST
        headers: { 'Content-Type': 'application/json' }, // Envoi des données sous forme JSON
        body: JSON.stringify(loginData) // Conversion des données du formulaire en chaîne JSON
    })
    .then(response => response.json()) // Une fois la réponse obtenue, la convertir en format JSON
    .then(data => {
        if (data.success) { // Si la connexion est réussie
            window.location.href = data.redirect; // Redirige l'utilisateur vers l'URL donnée dans la réponse
        } else {
            alert(data.message); // Sinon, affiche un message d'erreur
        }
    });
});

// Gestion de l'envoi du formulaire d'inscription
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche l'envoi normal du formulaire pour pouvoir le traiter en JavaScript

    // Création d'un objet FormData qui permet d'extraire facilement les données du formulaire
    const formData = new FormData(e.target);

    // Création d'un objet contenant les données d'inscription
    const signupData = {
        username: formData.get('username'), // Récupère le nom d'utilisateur
        password: formData.get('password'), // Récupère le mot de passe
        email: formData.get('email')        // Récupère l'email
    };

    // Envoi d'une requête POST au serveur pour tenter l'inscription de l'utilisateur
    fetch('/signup', {
        method: 'POST', // Utilisation de la méthode POST
        headers: { 'Content-Type': 'application/json' }, // Envoi des données sous forme JSON
        body: JSON.stringify(signupData) // Conversion des données du formulaire en chaîne JSON
    })
    .then(response => response.json()) // Une fois la réponse obtenue, la convertir en format JSON
    .then(data => {
        if (data.success) { // Si l'inscription réussit
            alert(data.message); // Affiche un message de succès
            document.getElementById('showLoginForm').click(); // Simule un clic pour afficher le formulaire de connexion
        } else {
            alert(data.message); // Sinon, affiche un message d'erreur
        }
    });
});

// Gestion du clic pour afficher le formulaire d'inscription
document.getElementById('showSignupForm').addEventListener('click', function () {
    // Cache la section de connexion et affiche celle d'inscription
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'block';
});

// Gestion du clic pour afficher le formulaire de connexion
document.getElementById('showLoginForm').addEventListener('click', function () {
    // Cache la section d'inscription et affiche celle de connexion
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
});

