const hamburger = (x) => {
  x.classList.toggle("change");
  document.querySelector("#signs").classList.toggle("display-menu");
};


const displayBook = () => {
  document.querySelector(".seat-block").classList.toggle("display-seat");
};
const cancelBook = () => {
  displayBook();
};
const confirmBook = () => {
  const seatNumber = document.querySelector("input[name=seat-selection]:checked").value;
  console.log(seatNumber);
  window.location.href = "../html/my-trips.html";
};
