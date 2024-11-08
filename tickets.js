document.getElementById('ticketForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const numTickets = document.getElementById('numTickets').value;
    const visitDate = document.getElementById('visitDate').value;

    alert(`Billets réservés avec succès !\nNombre de billets: ${numTickets}\nDate de visite: ${visitDate}`);
    e.target.reset();
});
