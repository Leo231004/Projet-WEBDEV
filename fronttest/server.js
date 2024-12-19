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
// Middleware pour vérifier si l'utilisateur est administrateur
function ensureAdmin(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Non authentifié.' });
    }

    // Vérification du rôle de l'utilisateur dans la base de données
    db.query('SELECT role FROM users WHERE username = ?', [req.session.user], (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification du rôle :', err);
            return res.status(500).json({ success: false, message: 'Erreur serveur.' });
        }

        if (results.length === 0 || results[0].role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Accès interdit. Vous n\'êtes pas administrateur.' });
        }

        // Si tout est bon, passer au middleware suivant ou à la route
        next();
    });
}


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
// Route pour ajouter une réservation dans la table "tickets"
app.post('/submit-reservation', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Utilisateur non connecté.' });
    }

    const { num_tickets, visit_date } = req.body;

    // Validation des données
    if (!num_tickets || !visit_date) {
        return res.status(400).json({ success: false, message: 'Données invalides.' });
    }

    // Requête pour récupérer l'user_id en fonction du username dans la session
    db.query('SELECT id FROM users WHERE username = ?', [req.session.user], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'user_id:', err);
            return res.status(500).json({ success: false, message: 'Erreur serveur.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé.' });
        }

        const userId = results[0].id;

        // Insérer la réservation dans la table "tickets"
        const query = `
            INSERT INTO tickets (user_id, num_tickets, visit_date, purchased_at)
            VALUES (?, ?, ?, NOW())
        `;
        db.query(query, [userId, num_tickets, visit_date], (err) => {
            if (err) {
                console.error('Erreur lors de l\'insertion de la réservation:', err);
                return res.status(500).json({ success: false, message: 'Erreur serveur.' });
            }

            res.json({ success: true, message: 'Réservation ajoutée avec succès.' });
        });
    });
});
// Route POST pour soumettre un avis
app.post('/submit-review', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Utilisateur non connecté.' });
    }

    const { enclosure_id, rating, comment } = req.body;

    // Validation des données
    if (!enclosure_id || !rating || !comment) {
        return res.status(400).json({ success: false, message: 'Champs manquants.' });
    }

    // Récupérer user_id depuis username dans la session
    db.query('SELECT id FROM users WHERE username = ?', [req.session.user], (err, results) => {
        if (err || results.length === 0) {
            console.error('Erreur récupération user_id:', err);
            return res.status(500).json({ success: false, message: 'Utilisateur non trouvé.' });
        }

        const user_id = results[0].id;

        // Insertion dans la table reviews
        const query = `
            INSERT INTO reviews (enclosure_id, user_id, rating, comment, created_at)
            VALUES (?, ?, ?, ?, NOW())
        `;
        db.query(query, [enclosure_id, user_id, rating, comment], (err) => {
            if (err) {
                console.error('Erreur insertion avis:', err);
                return res.status(500).json({ success: false, message: 'Erreur serveur.' });
            }

            res.json({ success: true, message: 'Avis soumis avec succès.' });
        });
    });
});
app.get('/admin/enclosures', ensureAdmin, (req, res) => {
    db.query('SELECT * FROM enclosures', (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des enclos:', err);
            return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
        }
        res.json({ success: true, enclosures: results });
    });
});
// Route pour mettre à jour les horaires de nourrissage
app.post('/admin/update-feeding-schedule', ensureAdmin, (req, res) => {
    const { enclosure_id, feeding_schedule } = req.body;

    db.query('UPDATE enclosures SET feeding_schedule = ? WHERE enclosure_id = ?', [feeding_schedule, enclosure_id], (err) => {
        if (err) {
            console.error('Erreur lors de la mise à jour des horaires:', err);
            return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
        }
        res.json({ success: true, message: 'Horaire mis à jour avec succès.' });
    });
});

// Route pour déplacer un animal
app.post('/admin/move-animal', ensureAdmin, (req, res) => {
    const { animal_id, new_enclosure_id } = req.body;

    db.query('UPDATE animals SET enclosure_id = ? WHERE animal_id = ?', [new_enclosure_id, animal_id], (err) => {
        if (err) {
            console.error('Erreur lors du déplacement de l\'animal:', err);
            return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
        }
        res.json({ success: true, message: 'Animal déplacé avec succès.' });
    });
});

function ensureAdmin(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Non authentifié.' });
    }

    db.query('SELECT role FROM users WHERE username = ?', [req.session.user], (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification du rôle :', err);
            return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
        }

        if (results.length === 0 || results[0].role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Accès interdit. Vous n\'êtes pas administrateur.' });
        }

        next(); // Autorise l'accès si l'utilisateur est admin
    });
}
app.get('/check-admin', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Non authentifié.' });
    }

    db.query('SELECT role FROM users WHERE username = ?', [req.session.user], (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification du rôle :', err);
            return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Utilisateur introuvable.' });
        }

        const role = results[0].role;
        if (role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Accès interdit. Vous n\'êtes pas administrateur.' });
        }

        res.json({ success: true, message: 'Accès admin confirmé.', username: req.session.user, role });
    });
});
