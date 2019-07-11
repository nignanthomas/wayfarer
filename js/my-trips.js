const bookings = [
  {
  booking_id : "001021",
  bus_license_number : "KCR 4455",
  trip_date: new Date(),
  first_name: "Raphael",
  last_name: "Katana",
  user_email: "raphaelkatana@gmail.com",
  },
  {
  booking_id : "011009",
  bus_license_number : "KCQ 6968",
  trip_date: new Date(),
  first_name: "Thomas",
  last_name: "Thomasson",
  user_email: "nignanthomas@gmail.com",
  }
]

const tripsDiv = document.querySelector("#trips-container");

bookings.forEach((booking,i)=>{
  newTrip = document.createElement("div");
  newTrip.classList.add("one-trip");
  newTrip.innerHTML= `<div class="main-box">
                        <div class="container">
                          <div class="">Booking Code: #WF${booking.booking_id}</div>
                          <div class="">Trip ID: 001</div>
                          <hr>
                          <div class="passenger">
                            <div>Name: ${booking.first_name} ${booking.last_name}</div>
                            <div>Contact: ${booking.user_email}</div>
                          </div>
                          <hr>
                          <div class="voyage">
                            <!-- Kigali<img src="../images/arrow.png" alt="">Nairobi -->
                            <div class="origin">Kigali</div>
                            <div class="arrow"><img src="../images/arrow.png" alt=""></div>
                            <div class="destination">Nairobi</div>
                          </div>
                          <div class="date">Trip Date: Sun, 7th Jul 2019</div>
                          <div class="time">Trip Time: 09:00pm</div>
                          <div class="bus-license">Bus License: ${booking.bus_license_number}</div>
                          <div class="date-booked">Booked On: Mon, 12th May 2019</div>
                        </div>
                        </div>
                        <div class="more-box">
                          <div class="container">
                            <div class="more"><button type="button" name="button" onclick="deleteBooking();">Delete Booking</button></div>
                            <div class="price">Total: $50</div>
                          </div>
                        </div>
                      </div>
                  </div>`;

  tripsDiv.appendChild(newTrip);
});

const deleteBooking = () => {
  alert("Booking Deleted")
}
