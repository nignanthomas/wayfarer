const signUp = () => {
  const email = document.querySelector("#email").value;
  const fname = document.querySelector("#fname").value;
  const lname = document.querySelector("#lname").value;
  validate();
}
const validate = () => {
  const password = document.querySelector("#password");
  const confirm = document.querySelector("#confirm");
  const error = document.querySelector(".error-message");

  if(password.value != confirm.value) {
    error.textContent = "Passwords Don't Match";
  } else {
    window.location.href = "../html/index.html#trips-section";
  }
}
