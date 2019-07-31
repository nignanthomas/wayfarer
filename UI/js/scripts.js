const hamburger = (x) => {
  x.classList.toggle("change");
  document.querySelector("#trips").classList.toggle("display-menu");
  document.querySelector("#signs").classList.toggle("display-menu");
};


const displayBook = () => {
  document.querySelector(".seat-block").classList.toggle("display-seat");
};
const cancelBook = () => {
  document.querySelector(".seat-block").classList.toggle("display-seat");
};
const confirmBook = () => {
  const seatNumber = document.querySelector("input[name=seat-selection]:checked").value;
  console.log(seatNumber);
};
