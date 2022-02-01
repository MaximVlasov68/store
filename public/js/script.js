// Get the modal
let modal = document.querySelector('.modal');
let login  = document.querySelector('.login');
let loginBtn = document.querySelector('.login-btn');
let regBtn = document.querySelector('.reg-btn');


function openModal(){
    modal.style.display = "block";
    
}
function closeModal(){
    modal.style.display = "none";
    
}
function select(){
    if(loginBtn.classList.contains('active')){
        /* console.log("регистрация"); */
        loginBtn.classList.remove('active')
        regBtn.classList.add('active')
    } else if(regBtn.classList.contains('active')){
        regBtn.classList.remove('active')
        loginBtn.classList.add('active')
       /*  console.log("авторизация");
        loginBtn.classList.add('active') */
        
    }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}