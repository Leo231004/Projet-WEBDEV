<?php
include('db.php');

try {
    $stmt = $pdo->query("SELECT * FROM enclosures");
    $enclosures = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($enclosures);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur lors de la récupération des données : " . $e->getMessage()]);
}
?>
