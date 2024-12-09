<?php
// Paramètres de connexion à la base de données
$servername = "localhost";  // à adapter si nécessaire
$username = "root";         // votre nom d'utilisateur MySQL
$password = "";             // votre mot de passe MySQL
$dbname = "parc_animalier"; // le nom de votre base de données

// Créer une connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Erreur de connexion : " . $conn->connect_error);
}

// Requête pour récupérer tous les enclos
$sql = "SELECT id, name, description, detailed_description, image FROM enclosures";
$result = $conn->query($sql);

// Tableau pour stocker les données des enclos
$enclosures = array();

if ($result->num_rows > 0) {
    // Sortie des données de chaque ligne
    while($row = $result->fetch_assoc()) {
        $enclosures[] = $row;
    }
} else {
    echo json_encode(['error' => 'Aucun enclos trouvé']);
    exit();
}

// Renvoyer les données au format JSON
echo json_encode($enclosures);

// Fermer la connexion à la base de données
$conn->close();
?>
