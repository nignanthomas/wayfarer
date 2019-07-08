const trips = [
  {
    id: 1,
    seatingCapacity: 43,
    busLicenseNumber: "KCR 4455",
    origin: "Kigali",
    destination: "Nairobi",
    tripDate: new Date(),
    tripTime: "09:00pm" ,
    fare: 50,
    status: 1
  },
  {
    id: 2,
    seatingCapacity: 47,
    busLicenseNumber: "KCQ 6968",
    origin: "Kigali",
    destination: "Kampala",
    tripDate: new Date(),
    tripTime: "07:00pm" ,
    fare: 25,
    status: 1
  },
]
console.log(trips[0].id);


const tripsDiv = document.querySelector("#trips-container");

trips.forEach((trip,i)=>{
  newTrip = document.createElement("div");
  newTrip.classList.add("one-trip");
  newTrip.innerHTML= `<div class="main-box">
    <div class="container">
      <div class="voyage">
        <div class="origin">${trips[i].origin}</div>
        <div class="arrow"><img src="./images/arrow.png" alt=""></div>
        <div class="destination">${trips[i].destination}</div>
      </div>
      <div class="date">${trips[i].tripDate}</div>
      <div class="time">${trips[i].tripTime}</div>
      <div class="bus-type">43 Seater</div>
    </div>
  </div>
  <div class="more-box">
    <div class="container">
      <div class="more"><button type="button" name="button">Details</button></div>
      <div class="price">$${trips[i].fare}</div>
    </div>
  </div>`;

  tripsDiv.appendChild(newTrip);
});




console.log(tripsDiv);
