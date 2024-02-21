const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

let upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowerLetters = "abcdefghijklmnopqrstuvwxyz";  
let numbers = "0123456789";
let symbols = "!@#$%^&*()_+";

function getLowercase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
    const len = parseInt(lenEl.value);
    const options = {
        upper: upperEl.checked,
        lower: lowerEl.checked,
        number: numberEl.checked,
        symbol: symbolEl.checked
    };

    const password = buildPassword(len, options);
    pwEl.innerText = password;
}

function buildPassword(length, options) {
    
    let password = "";

    for (const [key, value] of Object.entries(options)) {
        if (value) {
            const generatorFunction = generators[key];
            password += generatorFunction();
        }
    }

    const remainingLength = length - password.length;
    for (let i = 0; i < remainingLength; i++) {
        const randomGenerator = getRandomGenerator();
        password += randomGenerator();
    }

    return password;
}
function getRandomGenerator() {
    const generatorsArray = Object.values(generators);
    const randomIndex = Math.floor(Math.random() * generatorsArray.length);
    return generatorsArray[randomIndex];
}

const generators = {
    upper: getUppercase,
    lower: getLowercase,
    number: getNumber,
    symbol: getSymbol
};
