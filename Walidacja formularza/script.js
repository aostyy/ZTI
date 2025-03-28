// const - deklaracja zmiennej które nie zmienia swojej wartości w trakcie trwania programu
// # - odwołanie do atrybutu id(identyfikatora) elementu html
// . - odwołanie do atrybutu class elementu html
const userName = document.querySelector('input#username');
const email = document.querySelector('input#email');
const password1 = document.querySelector('input#password1');
const password2 = document.querySelector('input#password2');
const terms = document.querySelector('input#terms');
const resetButton = document.querySelector('input.reset');
const submitButton = document.querySelector('input.submit');

function checkEmail(){
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(email.value)) {
        showOrHideErrorMessage(email, "Adres email nieprawidłowy");
    } else {
        showOrHideErrorMessage(email, "");
    }
}

function checkPasswords(){
    if (password1.value !== password2.value) {
        showOrHideErrorMessage(password2, "Hasła są różne");
    } else {
        showOrHideErrorMessage(password2, "");
    }
}

function checkTerms(){
    if (!terms.checked){
        showOrHideErrorMessage(terms, "Zaakceptuj regulamin")
    } else {
        showOrHideErrorMessage(terms, "")
    }
}

function showOrHideErrorMessage(input, text){
    const box = input.parentElement;
    const errorMsg = box.querySelector('p.error_message');
    errorMsg.textContent = text;
}

function checkInputLength(input, minLength){
    if (input.value.length < minLength) {
        //apostrof ` (inny niż ')
        showOrHideErrorMessage(input, `Pole ${input.previousElementSibling.textContent.toLowerCase().replace(":","")} 
        powinno zawierać minimum ${minLength} znaki`);
    } else {
        showOrHideErrorMessage(input, "");
}}

resetButton.addEventListener('click', () => {
    const errorMessages = [...document.querySelectorAll('p.error_message')];
    errorMessages.forEach((error) => {
        error.textContent = "";
    })
})

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    checkEmail();
    checkPasswords();
    checkTerms();
    checkInputLength(userName, 3);
    checkInputLength(password1, 4);
})