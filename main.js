// main.js

// === Navigation Menu Active State ===
// Cette fonction met à jour l'état actif des liens du menu en fonction de la page actuelle.
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active'); // Ajoute une classe 'active' pour styliser le lien actuel
        } else {
            link.classList.remove('active');
        }
    });
});

// === Scroll to Top Button ===
// Ajoute un bouton pour remonter en haut de la page si nécessaire
const scrollToTopButton = document.createElement('button');
scrollToTopButton.textContent = '↑ Top';
scrollToTopButton.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// === Mobile Menu Toggle ===
// Si le site est conçu pour être responsive, cette section permet de gérer le menu pour les mobiles.
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navMenu = document.querySelector('header nav ul');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });
}

// === Form Validation (exemple) ===
// Simple validation pour vérifier que les formulaires de connexion et de réservation sont remplis
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let valid = true;

    inputs.forEach(input => {
        if (!input.value) {
            valid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return valid;
}

// Exemple d'utilisation de la validation sur le formulaire de billetterie
const ticketForm = document.getElementById('ticketForm');
if (ticketForm) {
    ticketForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(ticketForm)) {
            alert('Formulaire soumis avec succès!');
        } else {
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    });
}

// === Gestion des messages d'erreur ===
// Enlève les messages d'erreur lorsque l'utilisateur commence à taper dans les champs de formulaire
document.querySelectorAll('input, textarea').forEach(element => {
    element.addEventListener('input', () => {
        element.classList.remove('error');
    });
});

