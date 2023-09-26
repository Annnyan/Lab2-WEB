'use strict';

const form = document.querySelector(".form");
const fullname = document.getElementsByName("fullname")[0];
const idCard = document.getElementsByName("id-card")[0];
const birthDate = document.getElementsByName("birth-date")[0];
const city = document.getElementsByName("city")[0];
const email = document.getElementsByName("email")[0];
const submitButton = document.querySelector(".button");

const numsTable = document.querySelector(".nums-table");

let fullnameError = false;
let idCardError = false;
let birthDateError = false;
let cityError = false;
let emailError = false;

const fullnameRegexp = /^([A-Z][a-z]+ [A-Z]\. [A-Z]\.)$/;
const idCardRegexp = /^([A-Z]{2} №[0-9]{6})$/;
const birthDateRegexp = /^((\d){2}\.(\d){2}\.(\d){4})$/;
const cityRegexp = /^([A-Z][a-z]+)$/;
const emailRegexp = /^([a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*)$/;

submitButton.addEventListener("click", () => {
  if (!fullnameRegexp.test(fullname.value.trim())) {
    fullnameError = true;
  } else {
    fullnameError = false;
  }

  if (!idCardRegexp.test(idCard.value.trim())) {
    idCardError = true;
  } else {
    idCardError = false;
  }

  if (!birthDateRegexp.test(birthDate.value.trim())) {
    birthDateError = true;
  } else {
    birthDateError = false;
  }

  if (!cityRegexp.test(city.value.trim())) {
    cityError = true;
  } else {
    cityError = false;
  }

  if (!emailRegexp.test(email.value.trim())) {
    emailError = true;
  } else {
    emailError = false;
  }

  updateErrors();

  if (!fullnameError && !idCardError && !birthDateError && !cityError && !emailError) {
    openTable();
  }
});


for (let i = 0; i < 36; i++) {
  const cell = document.createElement('div');

  cell.classList.add('cell');
  cell.innerHTML = i + 1;

  if (i === 5) {
    cell.innerHTML += `<input type="color" class="color-picker" oninput="setPickedColor(this)">`
    cell.addEventListener('mouseover', () => {
      setRandomColor(cell);
    })
    cell.addEventListener('dblclick', () => {
      setColumnColor();
    })
  }

  numsTable.append(cell);
}

function setRandomColor(element) {
  element.style.backgroundColor = getRandomColor();
  element.style.color = getRandomColor();
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setPickedColor(element) {
  element.parentElement.style.backgroundColor = element.value;
}

function setColumnColor() {
  const color = getRandomColor();
  const bgColor = getRandomColor();

  for (let i = 1; i <= 6; i++) {
    numsTable.children[6 * i - 1].style.backgroundColor = bgColor;
    numsTable.children[6 * i - 1].style.color = color;
  }
}

function updateErrors() {
  if (fullnameError) {
    addError(fullname)
  } else {
    removeError(fullname);
  }

  if (idCardError) {
    addError(idCard)
  } else {
    removeError(idCard);
  }

  if (birthDateError) {
    addError(birthDate)
  } else {
    removeError(birthDate);
  }

  if (cityError) {
    addError(city)
  } else {
    removeError(city);
  }

  if (emailError) {
    addError(email)
  } else {
    removeError(email);
  }
}

function addError(element) {
  element.classList.add("input-error");
}

function removeError(element) {
  element.classList.remove("input-error");
}

function openTable() {
  const tab = window.open(undefined, undefined, 'popup');
  tab.document.write(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <title>Table</title>
  </head>
  <body>
  <div class="table-container">
    <table class="table">
      <tbody>
        <tr>
          <th>Full name</th>
          <td>${fullname.value}</td>
        </tr>

        <tr>
          <th>ID-card</th>
          <td>${idCard.value}</td>
        </tr>

        <tr>
          <th>Birth date</th>
          <td>${birthDate.value}</td>
        </tr>

        <tr>
          <th>City</th>
          <td>${city.value}</td>
        </tr>

        <tr>
          <th>Email</th>
          <td>${email.value}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </body>
  </html>
  `);
  tab.document.close();
}