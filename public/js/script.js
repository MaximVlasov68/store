// Get the modal
let modal = document.querySelector('.modal');
let login = document.querySelector('.login');
let loginBtn = document.querySelector('.login-btn');
let registerBtn = document.querySelector('.reg-btn');
let regBtn = document.querySelector('.reg-btn');
let overlay = document.querySelector('.overlay');
let inputReg = document.querySelectorAll('.reg');
let saveMe = document.querySelector('.saveMe');
let singIn = document.querySelector('.singIn');
let action = document.querySelector('#action');
const loginForm = document.querySelector('.modal-content-login');
const registerForm = document.querySelector('.modal-content-register');

console.log(inputReg);

/* функции открывающие модалку профиля */
function openModal() {
  modal.style.display = "flex";
  overlay.style.display = "block";
}
function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none";
}

/* функция выбора действий в модальном окне регистрация/авторизация на главной странице */
function select(event) {
  event.target.classList.add('active');
  if (event.target.classList.contains('reg-btn')) {
    loginBtn.classList.remove('active');
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
  }
  else if (event.target.classList.contains('login-btn')) {
    registerBtn.classList.remove('active');
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';
  }
}



/* функция скрытия и раскрытия описания на странице productDetail */
function moreDescription() {
  let dots = document.getElementById("dots");
  let moreText = document.getElementById("more");
  let btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Подробнее ∨";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Короче ∧";
    moreText.style.display = "inline";
  }
}

/* Счётчик товаров на странице productDetails */
let count = document.getElementById("buttonCountNumber");

function plus() {
  let countPlus = count.innerHTML;
  if (+countPlus <= 19) {
    count.innerHTML++;
    let countPlus = count.innerHTML;
  }
}

function minus() {
  let countMinus = count.innerHTML;
  if (+countMinus >= 2) {
    count.innerHTML--;
    let countMinus = count.innerHTML;
  }
}

