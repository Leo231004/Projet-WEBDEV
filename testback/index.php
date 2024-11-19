<?php
include('login_system.php');
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page d'accueil</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <?php if (is_logged_in()): ?>
            <div class="welcome-box">
                <h1>Bienvenue, <?php echo htmlspecialchars($_SESSION['user']['username']); ?>!</h1>
                
                <?php if (is_admin()): ?>
                    <p>Vous êtes connecté en tant qu'administrateur.</p>
                    <!-- Afficher des options administratives -->
                <?php else: ?>
                    <p>Vous êtes connecté en tant qu'utilisateur.</p>
                <?php endif; ?>
                
                <a class="button logout-button" href="index.php?logout=true">Se déconnecter</a>
            </div>
        <?php else: ?>
            <div class="form-box">
                <h1>Connexion</h1>
                <?php if (isset($error_message)): ?>
                    <p class="error-message"><?php echo $error_message; ?></p>
                <?php endif; ?>
                <?php if (isset($success_message)): ?>
                    <p class="success-message"><?php echo $success_message; ?></p>
                <?php endif; ?>
                <form action="index.php" method="POST">
                    <div class="input-group">
                        <label for="username">Nom d'utilisateur :</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="input-group">
                        <label for="password">Mot de passe :</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button class="button" type="submit" name="login">Se connecter</button>
                </form>
            </div>

            <div class="form-box">
                <h1>Création de compte</h1>
                <form action="index.php" method="POST">
                    <div class="input-group">
                        <label for="username">Nom d'utilisateur :</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="input-group">
                        <label for="email">Email :</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="input-group">
                        <label for="password">Mot de passe :</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button class="button" type="submit" name="register">Créer un compte</button>
                </form>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>