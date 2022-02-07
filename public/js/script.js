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

function openModal(){
    modal.style.display = "block";
    overlay.style.display = "block";
    
}
function closeModal(){
    modal.style.display = "none";
    overlay.style.display = "none";
    
}
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
