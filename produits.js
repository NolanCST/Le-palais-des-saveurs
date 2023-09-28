// FONCTIONS

function renderStock(array) {
  contProduct.innerHTML = "";
  array.forEach(function (element, index) {
    contProduct.innerHTML += `<span>${index + 1} | Nom: ${element.nameProduct} | Quantite: </span><input class="quantityStock" type="number" value="${element.quantity}"/>
        <span>Type: ${element.type} | Prix d'achat HT: ${element.purchasingPriceHT}€ | Prix de vente HT: ${element.sellingPriceHT}€ | TVA: ${element.tva} | Marge HT: ${element.margeHT}€ | Prix de vente TTC: ${element.sellingPriceTTC}€ | Degre: ${
      element.degree
    }°</span><button class="btnDel">X</button><br>`;
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
