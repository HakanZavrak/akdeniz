fetch('flightJSONList.txt')
  .then(response => response.json())
  .then(jsonData => {
    const ticketList = document.getElementById('ticketList');

    // Access the flight ticket list from the JSON data
    const itineraryList = jsonData.response.itineraryList;

    // Generate the flight ticket list dynamically
    itineraryList.forEach(itinerary => {
      const flightOptionList = itinerary.flightOptionList;
      flightOptionList.forEach(flightOption => {
        const flight = flightOption.flightList[0];
        const departureAirport = flight.departureAirport.name;
        const arrivalAirport = flight.arrivalAirport.name;
        const departureTime = flight.departureTime;
        const arrivalTime = flight.arrivalTime;
        const airline = flight.flightOperator.name;
        const price = flightOption.fareOptionList[0].priceInRequestedCurrency;

        const ticket = document.createElement('div');
        ticket.classList.add('ticket');

        ticket.innerHTML = `
          <div class="airport">${departureAirport} &rarr; ${arrivalAirport}</div>
          <div class="time">${departureTime} - ${arrivalTime}</div>
          <div class="airline">${airline}</div>
          <div class="price">$${price}</div>
        `;

        ticketList.appendChild(ticket);
      });
    });
  })
  .catch(error => console.log('Error:', error));