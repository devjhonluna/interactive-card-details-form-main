//variables 
/* nombre */
let nameCard=document.querySelector('.card_details-name');
let nameInput=document.querySelector('#cardholder');
let nameErrorDiv=document.querySelector('.form_cardholder--error');

/* numero */
let numberCard=document.querySelector('.card_front_number');
let numberInput=document.querySelector('#cardNumber');
let numberErrorDiv=document.querySelector('.form_inputnumber--error');

/*MM*/
let monthCard=document.querySelector('.card_month');
let monthInput=document.querySelector('#cardMonth');
let monthErrorDiv=document.querySelector('.form_input-mm--error');

/*YY*/
let yearCard=document.querySelector('.card_year');
let yearInput=document.querySelector('#cardYear');
let yearErrorDiv=document.querySelector('.form_input-yy--error');

/*CVC*/
let cvcCard=document.querySelector('.card_back_cvc');
let cvcInput=document.querySelector('#cardCvc');
let cvcErrorDiv=document.querySelector('.form_input-cvc--error');

//ingreso dinámico
/* nombre dinámico */
nameInput.addEventListener('input',()=>{
    if (nameInput.value=='') {
        nameCard.innerText='JANE APPLESEED'
    }else{
        nameCard.innerText=nameInput.value;
    }    
});

/* number dinámico */
numberInput.addEventListener('input',event=>{

    let inputValue=event.target.value;
    numberCard.innerText=numberInput.value;

    /*validando que no haya letras */
    let regExp=/[A-z]/g;
    if (regExp.test(numberInput.value)) {
        showError(numberInput,numberErrorDiv,'Wrong Format, numbers Only')
    }else{
        numberInput.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g,'$1 ').trim();
        showError(numberInput,numberErrorDiv,'', false)
    }

    /*validando el 0 por defecto */
    if (numberInput.value == '') {
        numberCard.innerText='0000 0000 0000 0000'
    }

});

/* mes dinámico */
monthInput.addEventListener('input',()=>{
    monthCard.innerText=monthInput.value;
    validarLetras(monthInput,monthErrorDiv)
});

/* años dinámico */
yearInput.addEventListener('input',()=>{
    yearCard.innerText=yearInput.value;
    validarLetras(yearInput,yearErrorDiv)
});

/*cvc dinamico*/
cvcInput.addEventListener('input',()=>{
    cvcCard.innerText=cvcInput.value;
    validarLetras(cvcInput,cvcErrorDiv)
});

//boton confirmar
let submitBtn=document.querySelector('.form_submit')
let continueBtn=document.querySelector('.thanks_section_btn')

let nameValidation=false;
let numberValidation=false;
let monthValidation=false;
let yearValidation=false;
let cvcValidation=false;
let resetInputs=document.querySelectorAll('input[type=text]');

//formulario y thanks 

let formSection=document.querySelector('.form')
let thanksSection=document.querySelector('.thanks_section');

submitBtn.addEventListener('click',event=>{
    event.preventDefault();

    //validar name
    if(verificarIsFilled(nameInput,nameErrorDiv)){
        nameValidation=true;
    }else{
        nameValidation=false;
    }

    //validad numero
    if (verificarIsFilled(numberInput, numberErrorDiv)) {
        if (numberInput.value.length==19) {
            showError(numberInput, numberErrorDiv,'', false)
            numberValidation=true
        }else{
            showError(numberInput, numberErrorDiv,'Invalid number')
            numberValidation=false
        } 
    }

    //validar mes 
    if (verificarIsFilled(monthInput,monthErrorDiv)) {
        if (parseInt(monthInput.value)>0 && parseInt(monthInput.value)<=12) {
            showError(monthInput,monthErrorDiv,'', false)
            monthValidation=true
        } else {
            showError(monthInput,monthErrorDiv,'Invalid month')
            monthValidation=false
        } 
    }  
   

    //validar año
    
    if (verificarIsFilled(yearInput,yearErrorDiv)) {
        if (parseInt(yearInput.value)>22 && parseInt(yearInput.value)<=27) {
            showError(yearInput,yearErrorDiv,'', false)
            yearValidation=true;
        } else {
            showError(yearInput,yearErrorDiv,'Invalid year')
            yearValidation=false;
        } 
    }

    //validar cvc 
    if (verificarIsFilled(cvcInput,cvcErrorDiv)) {
        if (cvcInput.value.length===3) {
            showError(cvcInput,cvcErrorDiv,'', false)
            cvcValidation=true
        } else{
            showError(cvcInput,cvcErrorDiv,'Invalid cvc')
            cvcValidation=false
        }
    }

    if (nameValidation ==true && numberValidation ==true && monthValidation ==true && yearValidation==true && cvcValidation==true){
        formSection.style.display="none";
        thanksSection.style.display="block";
    }
})

continueBtn.addEventListener("click",event=>{
    event.preventDefault();

    thanksSection.style.display="none";
    formSection.style.display="block";

    resetInputs.forEach(input=>input.value='')

    //reset nombre
    if (nameInput.value=='') {
        nameCard.innerText='JANE APPLESEED'
    }else{
        nameCard.innerText=nameInput.value;
    }    

    //reset number
    if (numberInput.value == '') {
        numberCard.innerText='0000 0000 0000 0000'
    }

    //reset month  
    monthCard.innerText='00';

    //reset year 
    yearCard.innerText='00';

    //reset cvc
    cvcCard.innerText='000'
    
})

//functions
function showError(divInput,divError,msgError,show=true) {
    if (show) {
        divError.innerText=msgError;
        divInput.style.borderColor='hsl(0, 100%, 66%)'
    }else{
        divError.innerText=msgError;
        divInput.style.borderColor='hsl(270, 3%, 87%)'
    }    
}

function verificarIsFilled(divInput, divError) {
    if(divInput.value.length> 0){
        showError(divInput, divError, '', false);  
        return true      
    }else{
        showError(divInput, divError, "Can't be blank");
        return false
    }
}

function validarLetras(input,divError) {
    let regExp=/[A-z]/g;
    if (regExp.test(input.value)) {
        showError(input,divError,'Wrong Format, numbers Only')
    }else{
        showError(input,divError,'', false)
    }
}