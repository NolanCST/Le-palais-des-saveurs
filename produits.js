// FONCTIONS
function renderStock(array) {
  contProduct.innerHTML = "";
  array.forEach(function (element, index) {
    const backgroundColor = element.quantity >= 10 ? "#01D758" : "#DC143C"; // Condition de couleur de fond initiale
    contProduct.innerHTML += `<span>${index + 1} | Nom: ${element.nameProduct} | Quantite: </span><input class="quantityStock" type="number" value="${element.quantity}" style="background-color: ${backgroundColor}" />
        <span>Type: ${element.type} | Prix d'achat HT: ${element.purchasingPriceHT}€ | Prix de vente HT: ${element.sellingPriceHT}€ | TVA: ${element.tva} | Marge HT: ${element.margeHT}€ | Prix de vente TTC: ${element.sellingPriceTTC}€ | Degre: ${
      element.degree
    }°</span><button class="btnDel">X</button><br>`;
    let quantityStock = document.querySelector(".quantityStock");
    quantityStock.addEventListener("change", function () {
      if (quantityStock.value >= 10) {
        quantityStock.style.backgroundColor = "#01D758";
      } else {
        quantityStock.style.backgroundColor = "#DC143C";
      }
      const newQuantity = parseInt(quantityStock.value); // Obtenez la nouvelle quantité depuis l'input
      element.quantity = newQuantity; // Mettez à jour la quantité dans le tableau
      localStorage.setItem("@StockArray", JSON.stringify(renderStockArray)); // Mettez à jour le localStorage
    });
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
