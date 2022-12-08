leftButton = document.querySelectorAll(".left-currency button");
rightButton = document.querySelectorAll(".right-currency button");
p = document.querySelector(".input-text p");
p1 = document.querySelector(".input-text1 p");
input = document.querySelector(".input-text input");
input1 = document.querySelector(".input-text1 input");
let a = "RUB",
  b = "USD";
input1.addEventListener("input", api);
input.addEventListener("input", api1);

// Space Seperator
// function commify(n) {
//   var parts = n.toString().split(".");
//   const numberPart = parts[0];
//   const decimalPart = parts[1];
//   const thousands = /\B(?=(\d{3})+(?!\d))/g;
//   return (
//     numberPart.replace(thousands, " ") + (decimalPart ? "." + decimalPart : "")
//   );
// }
//Buttons' click event
leftButton.forEach((el) =>
  el.addEventListener("click", () => {
    a = el.innerHTML;
    api();
    changeText();
    leftButton.forEach((el) => {
      el.classList.remove("active");
    });
    el.classList.add("active");
  })
);

rightButton.forEach((el) =>
  el.addEventListener("click", () => {
    b = el.innerHTML;
    api1();
    changeText();
    rightButton.forEach((el) => {
      el.classList.remove("active");
    });
    el.classList.add("active");
  })
);

// Fetch Functions

function api() {

  fetch(`https://api.exchangerate.host/latest?base=${b}&symbols=${a}`)
    .then((response) => response.json())
    .then((data) => {
      input.value = (
        Number(input1.value.split(" ").join("")) *
        Number(Object.entries(data.rates)[0][1])
      ).toFixed(4);
      left(input)
      if (input1.value == 0) {
        input.value = "";
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    });
  
 
}

function api1() {

  fetch(`https://api.exchangerate.host/latest?base=${a}&symbols=${b}`)
    .then((response) => response.json())
    .then((data) => {
      input1.value = (
        Number(input.value.split(" ").join("")) *
        Number(Object.entries(data.rates)[0][1])
      ).toFixed(4);
      right(input1)
      if (input.value == 0) {
        input1.value = "";
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    });
  }
  


//Change amount of currency
function changeText() {
  fetch(`https://api.exchangerate.host/latest?base=${a}&symbols=${b}`)
    .then((response) => response.json())
    .then((data) => {
      p.innerHTML = `1 ${a} = ${Object.entries(data.rates)[0][1]} ${b} `;
    });
  fetch(`https://api.exchangerate.host/latest?base=${b}&symbols=${a}`)
    .then((response) => response.json())
    .then((data) => {
      p1.innerHTML = `1 ${b} = ${Object.entries(data.rates)[0][1]} ${a} `;
    });
}
changeText();
api1();

//Hamburger and X menu
const menu = document.querySelector(".text");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}
hamburger.addEventListener("click", toggleMenu);
menuItems.forEach(function (menuItem) {
  menuItem.addEventListener("click", toggleMenu);
});

//Imask
inputElement = document.getElementById("input1");
inputElement1 = document.getElementById("input2");

function left(inputElement){
var numberMask = IMask(inputElement, {
  mask: Number, // enable number mask
  scale: 6, // digits after point, 0 for integers
  signed: false, // disallow negative
  thousandsSeparator: " ", // any single char
  padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
  normalizeZeros: true, // appends or removes zeros at ends
  radix: ".",
  mapToRadix: [","]
});
}
function right(inputElement1){
var numberMask1 = IMask(inputElement1, {
  mask: Number, // enable number mask
  scale: 6, // digits after point, 0 for integers
  signed: false, // disallow negative
  thousandsSeparator: " ", // any single char
  padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
  normalizeZeros: true, // appends or removes zeros at ends
  radix: ".",
  mapToRadix: [","]
});
}
left(input)
right(input1)