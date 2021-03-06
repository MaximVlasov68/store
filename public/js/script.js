let modal = document.querySelector('.modal');
let modalError = document.querySelector('.modalError');
let login = document.querySelector('.login');
let loginBtn = document.querySelector('.login-btn');
let registerBtn = document.querySelector('.reg-btn');
let regBtn = document.querySelector('.reg-btn');
let overlay = document.querySelector('.overlay');
let saveMe = document.querySelector('.saveMe');
let singIn = document.querySelector('.singIn');
let action = document.querySelector('#action');
const loginForm = document.querySelector('.modal-content-login');
const registerForm = document.querySelector('.modal-content-register');
const catalogButton = document.querySelector('.catalogButton');
const catalogContent = document.querySelector('.catalogContent');

function catalogDisplay() {
  catalogContent.classList.toggle('show');
}

/* функции открывающие модалку профиля */
function openModal() {
  modal.style.display = 'flex';
  modal.style.animation = 'upToDownModal .8s forwards';
  overlay.style.display = 'block';
}
function closeModal() {
  /* modal.style.display = 'none'; */
  modal.style.animation = 'downToUpModal .8s forwards';
  overlay.style.display = 'none';
}

/* функции открывающие модалку ошибки связаную с недоступностью услуг */
function openModalError() {
  modalError.style.display = 'flex';
  modalError.style.animation = 'upToDownModal .8s forwards';
  overlay.style.display = 'block';
}
function closeModalError() {
  /* modalError.style.display = 'none'; */
  modalError.style.animation = 'downToUpModal .8s forwards';
  overlay.style.display = 'none';
}

/* функция "подняться вверх" */
const scrollBtn = document.querySelector('#scrollTop');
window.onscroll = () => {
  if (window.scrollY > 700) {
    scrollBtn.classList.remove('hideBtn');
  } else if (window.scrollY < 700) {
    scrollBtn.classList.add('hideBtn');
  }
};

scrollBtn.onclick = () => {
  window.scrollTo(0, 0);
};

/* функция выбора действий в модальном окне регистрация/авторизация на главной странице */
function select(event) {
  event.target.classList.add('active');
  if (event.target.classList.contains('reg-btn')) {
    loginBtn.classList.remove('active');
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
  } else if (event.target.classList.contains('login-btn')) {
    registerBtn.classList.remove('active');
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';
  }
}

/* функция скрытия и раскрытия описания на странице productDetail */
function moreDescription() {
  let text = document.querySelector('.description');
  let btnText = document.getElementById('myBtn');
  let arrow = document.querySelector('.arrow');

  text.classList.toggle('show');
  const style = getComputedStyle(text);
  if (style.display === '-webkit-box') {
    btnText.innerHTML = 'Подробнее';
    arrow.style.transform = 'rotate(360deg)';
  } else {
    btnText.innerHTML = 'Короче';
    arrow.style.transform = 'rotate(180deg)';
  }
}

/* Счётчик товаров на странице productDetails */

function plus(target) {
  let count = target.parentElement.querySelector('.buttonCountNumber');
  let countPlus = count.innerHTML;
  if (+countPlus <= 19) {
    count.innerHTML++;
  }
}

function minus(target) {
  let count = target.parentElement.querySelector('.buttonCountNumber');
  let countMinus = count.innerHTML;
  if (+countMinus >= 2) {
    count.innerHTML--;
  }
}

registerForm.elements.password.oninput = function () {
  document.querySelector('.passwordError').classList.add('hide');
};
registerForm.elements.checkPassword.oninput = function () {
  document.querySelector('.passwordError').classList.add('hide');
};

registerForm.onsubmit = async (event) => {
  event.preventDefault();
  document.querySelector('.passwordError').classList.add('hide');
  document.querySelector('.registerError').classList.add('hide');
  const { username, password, telephoneNumber, checkPassword } =
    registerForm.elements; /* взять переменные по name из коллекции registerForm */
  if (password.value !== checkPassword.value) {
    document.querySelector('.passwordError').classList.remove('hide');
    return;
  }
  const data = {
    username: username.value,
    password: password.value,
    telephoneNumber: telephoneNumber.value,
  };
  try {
    const result = await fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (result.ok) {
      const data = await result.json();
      console.log(data);
      registerBtn.classList.remove('active'); /* переход на форму авторизации */
      loginBtn.classList.add('active');
      loginForm.style.display = 'flex';
      registerForm.style.display = 'none';
      /* alert('Успешная регистрация'); */
    } else {
      const error = await result.json();
      if (error.name === 'KeyNotUniqueException') {
        document.querySelector('.registerError').classList.remove('hide');
        /* alert(error.detail);  поле должно быть уникальным */
      } else {
        alert(`Registration error: ${JSON.stringify(error)}`);
      }
    }
  } catch (e) {
    console.error(`Fetch error: ${e}`);
  }
};

loginForm.onsubmit = async function (event) {
  event.preventDefault();

  const { username, password } = loginForm.elements;

  const data = {
    username: username.value,
    password: password.value,
  };

  const res = await fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const resData = await res.json();
  if (resData.user) {
    location.reload();
  } else {
    document.querySelector('.loginError').classList.remove('hide');
  }
};

/* dropdown на главной странице для ссылок взаимодействия с профилем*/

let dropdownContent = document.querySelector('.dropdown-content');
function dropDownLinks() {
  dropdownContent.style.display = 'block';
  dropdownContent.style.animation = 'upToDown .8s forwards';
}
function closeLinks() {
  /* dropdownContent.style.animation = "downToUp .8s forwards"; */
  dropdownContent.style.display = 'none';
}

/* +- на главной странице для footer при размере страницы < 576 */

const coll = document.getElementsByClassName('collapsible');
let i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function () {
    if (document.documentElement.scrollWidth < 576) {
      this.classList.toggle('open');
      let info = this.nextElementSibling;
      console.log(info);
      if (info.style.maxHeight) {
        info.style.maxHeight = null;
      } else {
        info.style.maxHeight = 200 + 'px';
      }
    }
  });
}

const loadMoreButton = document.querySelector('.more');
if (loadMoreButton) {
  const productView = document.querySelector('script#recommendedProduct');
  const productTemplate = Handlebars.compile(productView.innerHTML);

  const contentBox = document.querySelector('.content-box');

  let currentPage = 2; /* потому что первая страница уже загружена */
  /* запрос на подгрузку товаров на main page */
  loadMoreButton.onclick = async function () {
    const res = await fetch('/loadProducts', {
      method: 'POST',
      body: JSON.stringify({
        count: 8,
        page: currentPage++ /* посфикс использовать старое значение а потом увеличить */,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const products = await res.json();
    const html = productTemplate({ products });
    contentBox.insertAdjacentHTML('beforeend', html);
  };
}
