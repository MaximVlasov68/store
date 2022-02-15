// Get the modal
let modal = document.querySelector('.modal');
let login  = document.querySelector('.login');
let loginBtn = document.querySelector('.login-btn');
let regBtn = document.querySelector('.reg-btn');
let overlay = document.querySelector('.overlay');
let inputReg = document.querySelectorAll('.reg');
let saveMe = document.querySelector('.saveMe');
let singIn = document.querySelector('.singIn');

console.log(inputReg);

/* функции открывающие модалку профиля */
function openModal(){
    modal.style.display = "block";
    overlay.style.display = "block";
}
function closeModal(){
    modal.style.display = "none";
    overlay.style.display = "none";
}

/* функция выбора действий в модальном окне регистрация/авторизация на главной странице */
function select(){
    if(loginBtn.classList.contains('active')){
        /* console.log("регистрация"); */
        loginBtn.classList.remove('active');
        regBtn.classList.add('active');
        saveMe.style.display = "none";
        singIn.innerHTML = "Зарегистрироваться";
        inputReg.forEach((element) => {
            console.log(element)
            element.style.display = "block";
          })
    } else if(regBtn.classList.contains('active')){
        regBtn.classList.remove('active');
        loginBtn.classList.add('active');
        saveMe.style.display = "block";
        singIn.innerHTML = "Войти в аккаунт";
        inputReg.forEach((element) => {
            console.log(element)
            element.style.display = "none";
          })
       /*  console.log("авторизация");
        loginBtn.classList.add('active') */
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
  if(+countPlus <= 19){
    count.innerHTML++;
    let countPlus = count.innerHTML;
  }
}

function minus() {
  let countMinus = count.innerHTML;
  if(+countMinus >= 2){
    count.innerHTML--;
    let countMinus = count.innerHTML;
  }
}

