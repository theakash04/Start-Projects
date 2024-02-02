let baseUrl =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
let output = document.querySelector(".output");
let getbtn = document.querySelector("#get");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");

for (let select of dropdowns) {
  for (code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if (select.name === "from" && code === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && code === "USD") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    flagUpdate(evt.target);
  });
}

const flagUpdate = (element) => {
  let code = element.value;
  let countrycode = countryList[code];
  let imgSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let image = element.parentElement.querySelector("img");
  image.src = imgSrc;
};

const updateExchange = async () => {
  let amount = document.querySelector(".amount input");
  let amountval = amount.value;
  if (amountval === "" || amountval < 1) {
    amountval = 1;
    amount.value = "1";
  }
  const url = `${baseUrl}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data[tocurr.value.toLowerCase()];
  let finalAmount = rate * amountval;

  output.innerText = `${amountval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
};

getbtn.addEventListener("click", () => {
  updateExchange();
});

addEventListener("keypress", (evt) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
    getbtn.click();
  }
});

window.addEventListener("load", () => {
  updateExchange();
});
