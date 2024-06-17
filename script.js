document.addEventListener('DOMContentLoaded', function() {
    const proxyUrl = "http://localhost:3000/api/reservations";

    fetch(proxyUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const filteredReservations = data.reservations.filter(reservation => 
                reservation.resourceName !== "Alienware - GPU Laptops (KI_Werkstatt)" && 
                reservation.resourceName !== "Raspberry Pi"
            );

            const reservationsContainer = document.getElementById('reservations-container');
            filteredReservations.forEach(reservation => {
                const reservationElement = document.createElement('div');
                reservationElement.innerHTML = `
                    <h2>${reservation.title}</h2>
                    <p>Tool Used: ${reservation.resourceName}</p>
                    <p>Booking Time: ${new Date(reservation.startDate).toLocaleString()} - ${new Date(reservation.endDate).toLocaleString()}</p>
                `;
                reservationsContainer.appendChild(reservationElement);
            });
        })
        .catch(error => console.error('Error fetching reservations:', error));
});
