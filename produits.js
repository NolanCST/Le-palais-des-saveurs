// FONCTIONS
function renderStock(array) {
  const contProduct = document.getElementById("contProduct");
  contProduct.innerHTML = "";

  array.forEach(function (element, index) {
    const backgroundColor = element.quantity >= 10 ? "#01D758" : "#DC143C"; // Condition de couleur de fond initiale

    const productDiv = document.createElement("div");
    productDiv.innerHTML = `<span>${index + 1} | Nom: ${element.nameProduct} | Quantite: </span><input class="quantityStock" type="number" id="quantity-${index}" min=0 value="${element.quantity}" style="background-color: ${backgroundColor}" />
        <span>Type: ${element.type} | Prix d'achat HT: ${element.purchasingPriceHT}€ | Prix de vente HT: ${element.sellingPriceHT}€ | TVA: ${element.tva} | Marge HT: ${element.margeHT}€ | Prix de vente TTC: ${element.sellingPriceTTC}€ | Degre: ${
      element.degree
    }°</span><button class="btnDel">X</button><br>`;

    contProduct.appendChild(productDiv);

    const quantityStock = document.getElementById(`quantity-${index}`);
    quantityStock.addEventListener("change", function () {
      if (quantityStock.value >= 10) {
        quantityStock.style.backgroundColor = "#01D758";
      } else {
        quantityStock.style.backgroundColor = "#DC143C";
      }
      const newQuantity = parseInt(quantityStock.value);
      element.quantity = newQuantity;
      const updatedStockArray = JSON.parse(localStorage.getItem("@StockArray")) || [];
      updatedStockArray[index] = element; // Mettez à jour l'élément dans le tableau
      localStorage.setItem("@StockArray", JSON.stringify(updatedStockArray)); // Mettez à jour le localStorage
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
