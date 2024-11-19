<?php
session_start();

// Inclure la connexion à la base de données
include('db.php');

// Fonction pour authentifier un utilisateur
function authenticate_user($username, $password) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user && password_verify($password, $user['password'])) {
        return $user;
    }
    return null;
}

// Fonction pour créer un compte utilisateur
function create_user($username, $email, $password) {
    global $pdo;
    // Validation du mot de passe : au moins 8 caractères, une majuscule, un chiffre
    if (strlen($password) < 8 || !preg_match('/[A-Z]/', $password) || !preg_match('/[0-9]/', $password)) {
        return "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.";
    }
    
    // Hacher le mot de passe avant de le stocker
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Insérer l'utilisateur dans la base de données
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
    try {
        $stmt->execute(['username' => $username, 'email' => $email, 'password' => $hashed_password]);
        return true;
    } catch (PDOException $e) {
        return "Erreur lors de la création du compte : " . $e->getMessage();
    }
}

// Connexion d'un utilisateur
if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $user = authenticate_user($username, $password);
    if ($user) {
        // Créer la session utilisateur
        $_SESSION['user'] = $user;
        header('Location: index.php');
        exit;
    } else {
        $error_message = "Nom d'utilisateur ou mot de passe incorrect.";
    }
}

// Création d'un compte utilisateur
if (isset($_POST['register'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $result = create_user($username, $email, $password);
    if ($result === true) {
        $success_message = "Compte créé avec succès. Vous pouvez maintenant vous connecter.";
    } else {
        $error_message = $result;
    }
}

// Déconnexion d'un utilisateur
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

// Vérification si un utilisateur est connecté
function is_logged_in() {
    return isset($_SESSION['user']);
}

// Vérification si un utilisateur est administrateur
function is_admin() {
    return is_logged_in() && isset($_SESSION['user']['role']) && $_SESSION['user']['role'] === 'admin';
}
?>