document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    // Traitement de la note et du commentaire
    alert(`Merci pour votre avis ! Note: ${rating}, Commentaire: ${comment}`);
    e.target.reset();
});
