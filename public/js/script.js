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
const catalogButton = document.querySelector('.catalogButton');
const catalogContent = document.querySelector('.catalogContent');

console.log(inputReg);

function catalogDisplay() {
  catalogContent.classList.toggle('show');
}

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
  let text = document.querySelector('.description');
  let btnText = document.getElementById("myBtn");
  let arrow = document.querySelector(".arrow");

  text.classList.toggle('show');
  const style = getComputedStyle(text);
  if (style.display === "-webkit-box") {
    btnText.innerHTML = "Подробнее";
    arrow.style.transform = "rotate(360deg)";
  } else {
    btnText.innerHTML = "Короче";
    arrow.style.transform = "rotate(180deg)";
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

registerForm.onsubmit = async (event) => {
  event.preventDefault();
  const { username, password, telephoneNumber } = registerForm.elements
  const data = {
    username: username.value,
    password: password.value,
    telephoneNumber: telephoneNumber.value,
  }
  try {
    const result = await fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (result.ok) {
      const data = await result.json()
      console.log(data);
    } else {
      const error = await result.json()
      alert(`Registration error: ${JSON.stringify(error)}`)
    }
  } catch (e) {
    console.error(`Fetch error: ${e}`);
  }
}

