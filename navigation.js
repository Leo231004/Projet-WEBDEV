function calculateRoute() {
    const startPoint = document.getElementById('startPoint').value;
    const endPoint = document.getElementById('endPoint').value;

    const routeResult = document.getElementById('routeResult');
    if (startPoint === endPoint) {
        routeResult.innerHTML = '<p>Vous êtes déjà au point d\'arrivée.</p>';
    } else {
        // Exemple simplifié, logique de calcul de l'itinéraire à ajouter
        routeResult.innerHTML = `<p>Itinéraire calculé de ${startPoint} à ${endPoint}.</p>`;
    }
}
