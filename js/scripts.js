const hamburger = (x) => {
  x.classList.toggle("change");
  document.querySelector("#trips").classList.toggle("display-menu");
  document.querySelector("#signs").classList.toggle("display-menu");
}
