// FONCTIONS
function renderStock(array) {
  const contProduct = document.getElementById("contProduct");
  contProduct.innerHTML = "";

  array.forEach(function (element, index) {
    const backgroundColor = element.quantity >= 10 ? "#01D758" : "#DC143C"; // Condition de couleur de fond initiale

    const productDiv = document.createElement("div");
    if (element.type == "ba") {
      productDiv.innerHTML = `<span>${index + 1} | Nom: ${
        element.nameProduct
      } | Quantite: </span><input class="quantityStock" type="number" id="quantity-${index}" min=0 value="${
        element.quantity
      }" style="background-color: ${backgroundColor}" />
        <span>Type: ${element.type} | Prix d'achat HT: ${
        element.purchasingPriceHT
      }€ | Prix de vente HT: ${element.sellingPriceHT}€ | TVA: ${
        element.tva
      } | Marge HT: ${element.margeHT}€ | Prix de vente TTC: ${
        element.sellingPriceTTC
      }€ | Degre: ${
        element.degree
      }°</span><button class="editBtn">X</button><button class="btnDel">X</button><br>`;
    } else {
      productDiv.innerHTML = `<span>${index + 1} | Nom: ${
        element.nameProduct
      } | Quantite: </span><input class="quantityStock" type="number" id="quantity-${index}" min=0 value="${
        element.quantity
      }" style="background-color: ${backgroundColor}" />
        <span>Type: ${element.type} | Prix d'achat HT: ${
        element.purchasingPriceHT
      }€ | Prix de vente HT: ${element.sellingPriceHT}€ | TVA: ${
        element.tva
      } | Marge HT: ${element.margeHT}€ | Prix de vente TTC: ${
        element.sellingPriceTTC
      }€</span><button class="editBtn">X</button><button class="btnDel">X</button><br>`;
    }

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
      const updatedStockArray =
        JSON.parse(localStorage.getItem("@StockArray")) || [];
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

function modifProduct() {
  let btnEditArray = document.querySelectorAll(".editBtn");
  btnEditArray.forEach(function (element, index) {
    element.addEventListener("click", function () {});
  });
}

function filterProduct() {
  let filterValue = filterInput.value.toLowerCase(); // Utilisez toLowerCase pour la comparaison insensible à la casse
  let filteredArray = renderStockArray.filter(function (element) {
    if (filterValue === "") {
      // Utilisez === pour la comparaison stricte
      return (
        element.type === "ba" ||
        element.type === "bna" ||
        element.type === "autre"
      );
    } else {
      return element.nameProduct.toLowerCase().includes(filterValue);
    }
  });
  renderStock(filteredArray);
}

let productTypeFilter = document.querySelector("#productTypeFilter");
let filterInput = document.getElementById("filter");
let contProduct = document.querySelector(".contProduct");
const recupLS = localStorage.getItem("@StockArray");
let renderStockArray;
if (recupLS) {
  renderStockArray = JSON.parse(recupLS);
  renderStock(renderStockArray);
} else {
  renderStockArray = [];
}
filterBtn.addEventListener("click", filterProduct);

filterInput.addEventListener("input", filterProduct);

productTypeFilter.addEventListener("input", () => {
  let filteredArray = renderStockArray.filter(function (element) {
    if (productTypeFilter.value == "") {
      return (
        element.type == "ba" || element.type == "bna" || element.type == "autre"
      );
    } else {
      return element.type == productTypeFilter.value;
    }
  });
  renderStock(filteredArray);
});
