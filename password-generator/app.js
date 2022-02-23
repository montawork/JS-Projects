// select DOM elements
const PWArea = document.getElementById('pw-area');
const copyBtn = document.getElementById('copy');
const PWLen = document.getElementById('len');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');

// all chars
const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '/*-+.&~#{([|-@)]}<>!?%';
let allChars = [upperLetters, lowerLetters, numbers, symbols];

// checked or not
upperEl.addEventListener('click', () => {
  if (upperEl.checked) {
    allChars.push(upperLetters);
  } else {
    allChars = allChars.filter((list) => list !== upperLetters);
  }
  !upperEl.checked;
});

lowerEl.addEventListener('click', () => {
  if (lowerEl.checked) {
    allChars.push(lowerLetters);
  } else {
    allChars = allChars.filter((list) => list !== lowerLetters);
  }
  !lowerEl.checked;
});

symbolsEl.addEventListener('click', () => {
  if (symbolsEl.checked) {
    allChars.push(symbols);
  } else {
    allChars = allChars.filter((list) => list !== symbols);
  }
  !symbolsEl.checked;
});

numbersEl.addEventListener('click', () => {
  if (numbersEl.checked) {
    allChars.push(numbers);
  } else {
    allChars = allChars.filter((list) => list !== numbers);
  }
  !numbersEl.checked;
});

// variables
let password = '';
let passwordLength = 10;

// events
generateBtn.addEventListener('click', () => {
  // asign password length
  passwordLength = PWLen.value;

  // get random password
  for (let i = 1; i <= passwordLength; i++) {
    const randomCharListNumber = Math.floor(Math.random() * allChars.length);
    const randomCharList = allChars[randomCharListNumber];

    const randomCharNumber = Math.floor(Math.random() * randomCharList.length);
    const randomChar = randomCharList[randomCharNumber];
    password += randomChar;
  }

  // fill in password area
  PWArea.innerText = password;
  // reset password
  password = '';
});

// copy password to clipboard
copyBtn.addEventListener('click', () => {
  const copyText = PWArea.textContent;
  navigator.clipboard.writeText(copyText).then(() => {
    window.alert('password copied to clipboard');
  });
});
