<html>
    <head>
        <?php
        require_once("users.php");
        ?>
    </head>
    <body>
        test
        <?php
            // Définition d'une variable
            $var = "test2";
            // Affichage de la variable
            echo $var;
            // Vérification de l'existence des paramètres GET
            if(isset($_GET["name"])&& isset($_GET["lastname"])){
            // Affichage des paramètres GET
            echo $_GET["name"].' '.$_GET["lastname"];
            }
            // Appel de la fonction pour remplir les utilisateurs
            fillUsers();
        ?>
    </body>
</html>
