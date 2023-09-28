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
      }€</span><span> | TVA: ${element.tva} | Marge HT: ${element.margeHT}€ | Prix de vente TTC: ${element.sellingPriceTTC}€ | Degre: ${element.degree}°</span><button class="editBtn"></button><button class="btnDel"></button><br>`;
    } else {
      productDiv.innerHTML = `<span>${index + 1} |  Nom: <span class="editName">${element.nameProduct}</span> | Quantite: </span><input class="quantityStock" type="number" id="quantity-${index}" min=0 value="${
        element.quantity
      }" style="background-color: ${backgroundColor}" />
        Type: <span class="editType">${element.type}</span> | Prix d'achat HT: <span class="editPurchasingPriceHT">${element.purchasingPriceHT}€</span> | Prix de vente HT: <span class="editSellingPriceHT">${
        element.sellingPriceHT
      }€</span><span> | TVA: ${element.tva} | Marge HT: ${element.margeHT}€ | Prix de vente TTC: ${element.sellingPriceTTC}€ </span><button class="editBtn"></button><button class="btnDel"></button><br>`;
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
  let btnEditArray = document.querySelectorAll(".editBtn");
  btnEditArray.forEach(function (element, index) {
    element.addEventListener("click", function () {
      // Récupérez l'élément spécifique que vous souhaitez modifier dans renderStockArray
      const productToEdit = renderStockArray[index];

      // Créez des éléments d'entrée pour chaque propriété que vous souhaitez modifier
      const editNameInput = document.createElement("input");
      editNameInput.className = "editInput";
      editNameInput.type = "text";
      editNameInput.value = productToEdit.nameProduct;

      const editTypeSelect = document.createElement("select");
      editTypeSelect.name = "productType";
      editTypeSelect.id = "productTypeFilter";
      editTypeSelect.innerHTML = `
        <option value="ba">Boisson alcoolisée</option>
        <option value="bna">Boisson non alcoolisée</option>
        <option value="autre">Autre</option>
      `;
      editTypeSelect.value = productToEdit.type;

      const editPurchasingPriceHTInput = document.createElement("input");
      editPurchasingPriceHTInput.className = "editInput";
      editPurchasingPriceHTInput.type = "number";
      editPurchasingPriceHTInput.value = productToEdit.purchasingPriceHT;

      const editSellingPriceHTInput = document.createElement("input");
      editSellingPriceHTInput.className = "editInput";
      editSellingPriceHTInput.type = "number";
      editSellingPriceHTInput.value = productToEdit.sellingPriceHT;

      // Remplacez le contenu actuel par les éléments d'entrée
      const parentDiv = element.parentElement; // Parent du bouton "Modifier"
      parentDiv.querySelector(".editName").innerHTML = "";
      parentDiv.querySelector(".editName").appendChild(editNameInput);

      parentDiv.querySelector(".editType").innerHTML = "";
      parentDiv.querySelector(".editType").appendChild(editTypeSelect);

      parentDiv.querySelector(".editPurchasingPriceHT").innerHTML = "";
      parentDiv.querySelector(".editPurchasingPriceHT").appendChild(editPurchasingPriceHTInput);

      parentDiv.querySelector(".editSellingPriceHT").innerHTML = "";
      parentDiv.querySelector(".editSellingPriceHT").appendChild(editSellingPriceHTInput);

      // Ajoutez un gestionnaire d'événements pour sauvegarder les modifications
      const saveButton = document.createElement("button");
      saveButton.className = "saveBtn";
      saveButton.innerText = "Enregistrer";
      parentDiv.appendChild(saveButton);

      saveButton.addEventListener("click", function () {
        // Mettez à jour les propriétés de l'élément avec les nouvelles valeurs
        productToEdit.nameProduct = editNameInput.value;
        productToEdit.type = editTypeSelect.value;
        productToEdit.purchasingPriceHT = parseFloat(editPurchasingPriceHTInput.value);
        productToEdit.sellingPriceHT = parseFloat(editSellingPriceHTInput.value);

        // Mettez à jour le localStorage avec le tableau modifié
        localStorage.setItem("@StockArray", JSON.stringify(renderStockArray));

        // Rechargez la liste avec les modifications
        renderStock(renderStockArray);
      });
    });
  });
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
