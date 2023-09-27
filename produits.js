// FONCTIONS

function renderStock(array) {
  contProduct.innerHTML = "";
  array.forEach(function (element, index) {
    contProduct.innerHTML += `<span>${index + 1} | ${element.nameProduct}</span><input class="quantityStock" type="number"/>
        <span>${element.type} | ${element.purchasingPriceHT}€ | ${element.sellingPriceHT}€ | ${element.tva} | ${element.margeHT}€ | ${element.sellingPriceTTC}€ | ${element.degree}°</span><button class="btnDel">X</button><br>`;
  });
  deleteProduct();
}

function deleteProduct() {
  let btnDelArray = document.querySelectorAll(".btnDel");
  btnDelArray.forEach(function (element, index) {
    element.addEventListener("click", function () {
      if (confirm("Voulez-vous supprimer le produit ?")) {
        renderStockArray.splice(index, 1);
        localStorage.setItem("@StockArray", JSON.stringify(renderStockArray));
        renderStock(renderStockArray);
      }
    });
  });
}

// LANCEMENT DE LA PAGE

let contProduct = document.querySelector(".contProduct");
const recupLS = localStorage.getItem("@StockArray");
let renderStockArray;
if (recupLS) {
  renderStockArray = JSON.parse(recupLS);
  renderStock(renderStockArray);
} else {
  renderStockArray = [];
}
console.log(renderStockArray);
