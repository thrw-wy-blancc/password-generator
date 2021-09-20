const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const upperCaseEl = document.getElementById('uppercase');
const lowerCaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


const randomFunction = {
    lower: getRandomLower, 
    upper: getRandomUpper, 
    number: getRandomNumber,
    symbol: getRandomSymbol
}

const messageEl = document.getElementById('message')

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        return
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    // alert("Pasword copied to clipboard!");
    resultEl.innerText= ' ';


    hideMessage();
});

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowerCaseEl.checked;
    const hasUpper = upperCaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbol, length);
});

function hideMessage(){
    messageEl.style.display = 'block';
    clipboardEl.disabled = true;
   
    setTimeout(function() { 
    messageEl.style.display = 'none';
    clipboardEl.disabled = false;
    }, 2000);
}

function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);


    if(typesCount === 0){
        return " ";
    } else{
        for(let i = 0; i < length; i+=typesCount){
            typesArray.forEach(type => {
                const functionName = Object.keys(type)[0];
                generatedPassword += randomFunction[functionName]();
            });
        }   
    }

    const finalPassword = generatedPassword.slice(0, length); 
   
    return finalPassword;
}

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol(){
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
}


