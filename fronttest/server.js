// server.js (Backend en Node.js avec Express et MySQL pour la gestion des utilisateurs)

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors'); // Importez le package CORS


const app = express();
// Ajoutez le middleware CORS pour autoriser le frontend
app.use(cors({
    origin: 'http://localhost', // URL de votre frontend (modifiez si nécessaire)
    credentials: true // Permettre les cookies/sessions cross-origin
}));
// Middleware pour l'analyse des formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Configurer les sessions
app.use(session({
    secret: 'votre_secret_pour_la_session',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 60, httpOnly: true } // 1 heure, sécuriser le cookie
}));

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'parc_animalier'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données MySQL.');
    }
});

// Middleware pour vérifier si l'utilisateur est connecté
function ensureNotLoggedIn(req, res, next) {
    if (req.session.user) {
        return res.redirect('/dashboard.html');
    }
    next();
}

// Middleware pour forcer la désactivation du cache afin que la page de connexion ne soit pas visible après la déconnexion
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// Route pour servir la page de connexion/inscription
app.get('/', ensureNotLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Point d'entrée pour la création de compte
app.post('/signup', (req, res) => {
    const { username, password, email } = req.body;

    // Log de débogage pour vérifier les données reçues
    console.log('Données reçues pour la création de compte:', { username, password, email });

    // Vérifier si l'utilisateur existe déjà
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification de l’utilisateur:', err);
            return res.json({ success: false, message: 'Erreur lors de la vérification de l’utilisateur' });
        }
        if (results.length > 0) {
            console.log('Nom d’utilisateur déjà utilisé');
            return res.json({ success: false, message: 'Nom d’utilisateur déjà utilisé' });
        }

        // Hachage du mot de passe
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Erreur lors du hachage du mot de passe:', err);
                return res.json({ success: false, message: 'Erreur lors du hachage du mot de passe' });
            }

            // Insérer le nouvel utilisateur dans la base de données
            const sql = 'INSERT INTO users (username, password, email, role, created_at) VALUES (?, ?, ?, ?, NOW())';
            db.query(sql, [username, hash, email, 'user'], (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'insertion de l\'utilisateur dans la base de données:', err);
                    return res.json({ success: false, message: 'Erreur lors de la création du compte' });
                }
                console.log('Utilisateur créé avec succès:', username);
                res.json({ success: true, message: 'Compte créé avec succès. Vous pouvez maintenant vous connecter.' });
            });
        });
    });
});

// Point d'entrée pour la connexion
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log('Tentative de connexion avec:', { username });

    // Recherche de l'utilisateur dans la base de données
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Erreur lors de la connexion à la base de données:', err);
            return res.json({ success: false, message: 'Erreur lors de la connexion à la base de données' });
        }
        if (results.length === 0) {
            console.log('Nom d’utilisateur ou mot de passe incorrect');
            return res.json({ success: false, message: 'Nom d’utilisateur ou mot de passe incorrect' });
        }

        const user = results[0];
        // Comparer le mot de passe entré avec celui stocké (haché)
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Erreur lors de la vérification du mot de passe:', err);
                return res.json({ success: false, message: 'Erreur lors de la vérification du mot de passe' });
            }

            if (isMatch) {
                // Connexion réussie
                req.session.user = username;
                console.log('Connexion réussie:', username);
                res.json({ success: true, redirect: '/dashboard.html' });
            } else {
                // Échec de la connexion
                console.log('Nom d’utilisateur ou mot de passe incorrect');
                res.json({ success: false, message: 'Nom d’utilisateur ou mot de passe incorrect' });
            }
        });
    });
});

// Point d'entrée pour vérifier la connexion
app.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.json({ success: true, username: req.session.user });
    } else {
        res.json({ success: false });
    }
});

// Point d'entrée pour la déconnexion
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erreur lors de la déconnexion:', err);
            return res.json({ success: false, message: 'Erreur lors de la déconnexion' });
        }
        console.log('Déconnexion réussie');
        res.json({ success: true });
    });
});

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur écoutant sur le port ${PORT}`);
});
// Route pour récupérer les données utilisateur
app.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Utilisateur non connecté' });
    }

    const username = req.session.user;
    db.query('SELECT username, email FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération du profil:', err);
            return res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
        }

        const user = results[0];
        res.json({ success: true, user });
    });
});
// Route pour vérifier l'état de connexion de l'utilisateur 
app.get('/check-session', (req, res) => {
    console.log('Session user :', req.session.user); // Vérifiez le contenu de la session
    if (req.session.user) {
        res.json({
            success: true,
            user: req.session.user // Retourne les infos utilisateur (nom, email)
        });
    } else {
        res.json({
            success: false,
            message: "Utilisateur non connecté"
        });
    }
});
