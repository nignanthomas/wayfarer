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


const tripsDiv = document.querySelector(".main-trips .container");
console.log(tripsDiv);
