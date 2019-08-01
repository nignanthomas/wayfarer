
const trips = [
  {
    id: 1,
    seatingCapacity: 43,
    busLicenseNumber: "KCR 4455",
    origin: "Kigali",
    destination: "Nairobi",
    tripDate: "Sunday, 24th of July",
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
    tripDate: "Sunday, 24th of July",
    tripTime: "07:00pm" ,
    fare: 25,
    status: 1
  },
]

const tripsDiv = document.querySelector("#trips-group");

trips.forEach((trip,i)=>{
  newTrip = document.createElement("div");
  newTrip.classList.add("container");
  newTrip.classList.add("one-trip");
  newTrip.innerHTML = `<div class="bus-icon">
    <i class="fa fa-bus"></i>
  </div>
  <div class="trip-details">
    <h3>${trip.origin}  ==>  ${trip.destination}</h3>
    <p>${trip.tripDate}</p>
    <p><b>@ ${trip.tripTime}</b></p>
    <p><b>11</b> seats available</p>
  </div>
  <div class="trip-more">
    <p><b>$${trip.fare}</b></p>
    <a href="one-trip.html"><button type="button" name="button">More</button></a>
  </div>`;
  if (i<trips.length-1) {
    newTrip.innerHTML += `<hr>`
  }

  tripsDiv.appendChild(newTrip);
});
