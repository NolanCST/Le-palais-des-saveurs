let container = document.querySelector(".container");
const recupLS = localStorage.getItem("@StockArray");
console.log(recupLS);
let renderStockArray;

if (recupLS) {
  renderStockArray = JSON.parse(recupLS);
  renderSTock(renderStockArray);
} else {
  renderStockArray = [];
}

function renderSTock(array) {
  array.forEach(function (element, index) {
    container.innerHTML += `<div class="">
        <span>${index + 1} | ${element.nameProduct}</span>
        <input class="quntityStock" type="number"/>
        <span>${element.type} | ${element.purchasingPriceHT} | ${
      element.sellingPriceHT
    } | ${element.TVA} | ${element.margeHT} | ${element.sellingPriceTTC} | ${
      element.degree
    }</span>
        </div>`;
  });
}
