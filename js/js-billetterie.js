//billet

document.addEventListener('DOMContentLoaded', function() {
    const adultInput = document.querySelector('.ticket-type-grid .ticket-type-card:nth-child(1) .quantity-input');
    const childInput = document.querySelector('.ticket-type-grid .ticket-type-card:nth-child(2) .quantity-input');
    const babyInput = document.querySelector('.ticket-type-grid .ticket-type-card:nth-child(3) .quantity-input');
    const adultsTotal = document.getElementById('adults-total');
    const childrenTotal = document.getElementById('children-total');
    const grandTotal = document.getElementById('grand-total');
    const ticketForm = document.querySelector('.ticket-form');

    function updateQuantity(input, isPlus) {
        let currentValue = parseInt(input.value);
        if (isPlus && currentValue < 10) {
            input.value = currentValue + 1;
        } else if (!isPlus && currentValue > 0) {
            input.value = currentValue - 1;
        }
        calculateTotal();
    }

    function calculateTotal() {
        const adultPrice = 22;
        const childPrice = 15;
        const adultCount = parseInt(adultInput.value);
        const childCount = parseInt(childInput.value);

        const adultsTotalValue = adultCount * adultPrice;
        const childrenTotalValue = childCount * childPrice;
        const total = adultsTotalValue + childrenTotalValue;

        adultsTotal.textContent = `${adultsTotalValue}€`;
        childrenTotal.textContent = `${childrenTotalValue}€`;
        grandTotal.textContent = `${total}€`;
    }

    // Quantity buttons
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.quantity-input');
            updateQuantity(input, true);
        });
    });

    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.quantity-input');
            updateQuantity(input, false);
        });
    });

    // Form submission
    ticketForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Basic validation
        const totalTickets = 
            parseInt(adultInput.value) + 
            parseInt(childInput.value) + 
            parseInt(babyInput.value);
        
        const visitDate = document.getElementById('visit-date').value;

        if (totalTickets === 0) {
            alert('Veuillez sélectionner au moins un billet.');
            return;
        }

        if (!visitDate) {
            alert('Veuillez sélectionner une date de visite.');
            return;
        }

        // Here you would typically send the data to a server
        alert('Réservation en cours de traitement...');
    });
});

// panneau deroulant
document.addEventListener('DOMContentLoaded', () => {
    const servicesLink = document.querySelector('nav ul li a[href="services.html"]');
    const servicesDropdown = document.createElement('div');
    servicesDropdown.classList.add('services-dropdown');
    
    servicesDropdown.innerHTML = `
        <ul>
            <li><a href="billetterie.html">Billetterie</a></li>
            <li><a href="recherche.html">Pour vous reperer</a></li>
        </ul>
    `;
    
    
    servicesLink.parentElement.appendChild(servicesDropdown);
});