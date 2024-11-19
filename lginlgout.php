<?php
// fichier db.php
$host = 'localhost';
$db = 'parc_animalier';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>

<?php
// fichier login_system.php
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

<!-- fichier index.php -->
<?php
include('login_system.php');
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page d'accueil</title>
</head>
<body>
    <?php if (is_logged_in()): ?>
        <h1>Bienvenue, <?php echo htmlspecialchars($_SESSION['user']['username']); ?>!</h1>
        
        <?php if (is_admin()): ?>
            <p>Vous êtes connecté en tant qu'administrateur.</p>
            <!-- Afficher des options administratives -->
        <?php else: ?>
            <p>Vous êtes connecté en tant qu'utilisateur.</p>
        <?php endif; ?>
        
        <a href="index.php?logout=true">Se déconnecter</a>
    <?php else: ?>
        <h1>Connexion</h1>
        <?php if (isset($error_message)): ?>
            <p style="color: red;"><?php echo $error_message; ?></p>
        <?php endif; ?>
        <?php if (isset($success_message)): ?>
            <p style="color: green;"><?php echo $success_message; ?></p>
        <?php endif; ?>
        <form action="index.php" method="POST">
            <label for="username">Nom d'utilisateur :</label>
            <input type="text" id="username" name="username" required><br>
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" name="password" required><br>
            <button type="submit" name="login">Se connecter</button>
        </form>

        <h1>Création de compte</h1>
        <form action="index.php" method="POST">
            <label for="username">Nom d'utilisateur :</label>
            <input type="text" id="username" name="username" required><br>
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" required><br>
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" name="password" required><br>
            <button type="submit" name="register">Créer un compte</button>
        </form>
    <?php endif; ?>
</body>
</html>
