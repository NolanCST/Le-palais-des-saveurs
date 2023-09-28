// FONCTIONS

function renderStock(array) {
  const contProduct = document.getElementById("contProduct");
  contProduct.innerHTML = "";

  array.forEach(function (element, index) {
    const backgroundColor = element.quantity >= 10 ? "#01D758" : "#DC143C"; // Condition de couleur de fond initiale

    const productDiv = document.createElement("div");
    productDiv.className = "productDiv";
    if (element.type == "ba") {
      productDiv.innerHTML = `<span>${index + 1} |  Nom: <span class="editName">${element.nameProduct}</span> | Quantite: </span><input class="quantityStock" type="number" id="quantity-${index}" min=0 value="${
        element.quantity
      }" style="background-color: ${backgroundColor}" />
        Type: <span class="editType">${element.type}</span> | Prix d'achat HT: <span class="editPurchasingPriceHT">${element.purchasingPriceHT}€</span> | Prix de vente HT: <span class="editSellingPriceHT">${
        element.sellingPriceHT
      }€</span><span> | TVA: ${element.tva} | Marge HT: <span class="editMargeHT">${element.margeHT}€</span> | Prix de vente TTC: <span class="editSellingPriceTTC">${element.sellingPriceTTC}€</span> | Degre: ${
        element.degree
      }°</span><button class="editBtn"></button><button class="btnDel"></button><br>`;
    } else {
      productDiv.innerHTML = `<span>${index + 1} |  Nom: <span class="editName">${element.nameProduct}</span> | Quantite: </span><input class="quantityStock" type="number" id="quantity-${index}" min=0 value="${
        element.quantity
      }" style="background-color: ${backgroundColor}" />
        Type: <span class="editType">${element.type}</span> | Prix d'achat HT: <span class="editPurchasingPriceHT">${element.purchasingPriceHT}€</span> | Prix de vente HT: <span class="editSellingPriceHT">${
        element.sellingPriceHT
      }€</span><span> | TVA: ${element.tva} | Marge HT: <span class="editMargeHT">${element.margeHT}€</span> | Prix de vente TTC: <span class="editSellingPriceTTC">${
        element.sellingPriceTTC
      }€</span></span><button class="editBtn"></button><button class="btnDel"></button><br>`;
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

function modifProduct() {
  let productDivs = document.querySelectorAll(".productDiv");

  productDivs.forEach(function (productDiv) {
    let editBtn = productDiv.querySelector(".editBtn");
    let editName = productDiv.querySelector(".editName");
    let editType = productDiv.querySelector(".editType");
    let editPurchasingPriceHT = productDiv.querySelector(".editPurchasingPriceHT");
    let editSellingPriceHT = productDiv.querySelector(".editSellingPriceHT");

    editBtn.addEventListener("click", function () {
      // Récupérez les valeurs précédentes depuis les éléments existants
      let previousName = editName.textContent;
      let previousType = editType.textContent;
      let previousPurchasingPriceHT = parseFloat(editPurchasingPriceHT.textContent);
      let previousSellingPriceHT = parseFloat(editSellingPriceHT.textContent);
      console.log(editName.value);
      // Créez un tableau d'options pour le <select>
      let typeOptions = ["ba", "bna", "autre"];

      // Créez une chaîne HTML pour les options du <select> en fonction des valeurs précédentes
      let selectOptions = typeOptions
        .map((option) => {
          if (option === previousType) {
            return `<option value="${option}" selected>${option}</option>`;
          } else {
            return `<option value="${option}">${option}</option>`;
          }
        })
        .join("");

      editName.innerHTML = `<input class="editInput editInputName" type="text" value="${previousName}"/>`;
      editType.innerHTML = `<select name="productType" class="editSelectType">${selectOptions}</select>`;
      editPurchasingPriceHT.innerHTML = `<input class="editInput editInputPurchasingPriceHT" type="number" value="${previousPurchasingPriceHT}"/>`;
      editSellingPriceHT.innerHTML = `<input class="editInput editInputSellingPriceHT" type="number" value="${previousSellingPriceHT}"/>`;

      // Mettez à jour les données du produit avec les nouvelles valeurs
      let editInputName = productDiv.querySelector(".editInputName");
      let editSelectType = productDiv.querySelector(".editSelectType");
      let editInputPurchasingPriceHT = productDiv.querySelector(".editInputPurchasingPriceHT");
      let editInputSellingPriceHT = productDiv.querySelector(".editInputSellingPriceHT");

      // Gestionnaire d'événements pour le calcul de la marge HT et du prix de vente TTC
      editInputPurchasingPriceHT.addEventListener("input", function () {
        calculateMarginAndTTC(productDiv);
      });

      editInputSellingPriceHT.addEventListener("input", function () {
        calculateMarginAndTTC(productDiv);
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          editName.innerHTML = `<span>${editInputName.value}</span>`;
          editType.innerHTML = `<span>${editSelectType.value}</span>`;
          editPurchasingPriceHT.innerHTML = `<span>${editInputPurchasingPriceHT.value}€</span>`;
          editSellingPriceHT.innerHTML = `<span>${editInputSellingPriceHT.value}€</span>`;
        }
      });

      // Mettez à jour les données du produit dans votre système
      // Vous pouvez ajouter ici la logique pour sauvegarder les modifications
    });
  });
}

function calculateMarginAndTTC(productDiv) {
  let editInputPurchasingPriceHT = productDiv.querySelector(".editInputPurchasingPriceHT");
  let editInputSellingPriceHT = productDiv.querySelector(".editInputSellingPriceHT");
  let editMargeHT = productDiv.querySelector(".editMargeHT");
  let editSellingPriceTTC = productDiv.querySelector(".editSellingPriceTTC");

  // Récupérez les valeurs du champ de modification du prix d'achat HT et du prix de vente HT
  let purchasingPriceHT = parseFloat(editInputPurchasingPriceHT.value);
  let sellingPriceHT = parseFloat(editInputSellingPriceHT.value);

  // Vérifiez si les valeurs sont valides
  if (!isNaN(purchasingPriceHT) && !isNaN(sellingPriceHT)) {
    // Calculez la marge HT
    let margeHT = sellingPriceHT - purchasingPriceHT;
    editMargeHT.innerHTML = `<span>${margeHT.toFixed(2)}€</span>`;

    // Calculez le prix de vente TTC (en supposant une TVA de 20%)
    let tva = 0.2; // 20% de TVA
    let sellingPriceTTC = sellingPriceHT * (1 + tva);
    editSellingPriceTTC.innerHTML = `<span>${sellingPriceTTC.toFixed(2)}€</span>`;
  }
}

function filterProduct() {
  filterInput.addEventListener("input", () => {
    let filterValue = filterInput.value.toLowerCase(); // Utilisez toLowerCase pour la comparaison insensible à la casse
    let filteredArray = renderStockArray.filter(function (element) {
      if (filterValue === "") {
        // Utilisez === pour la comparaison stricte
        return element.type === "ba" || element.type === "bna" || element.type === "autre";
      } else {
        return element.nameProduct.toLowerCase().includes(filterValue);
      }
    });
    renderStock(filteredArray);
  });
}

function filterType() {
  productTypeFilter.addEventListener("input", () => {
    let filteredArray = renderStockArray.filter(function (element) {
      if (productTypeFilter.value == "") {
        return element.type == "ba" || element.type == "bna" || element.type == "autre";
      } else {
        return element.type == productTypeFilter.value;
      }
    });
    renderStock(filteredArray);
  });
}

//LANCEMENT DE LA PAGE

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

modifProduct();

filterProduct();

filterType();
