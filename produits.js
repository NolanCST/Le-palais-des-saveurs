// FONCTIONS

function renderStock(array) {
  const contProduct = document.getElementById("contProduct");
  contProduct.innerHTML = "";

  array.forEach(function (element, index) {
    const backgroundColor = element.quantity >= 10 ? "#01D758" : "#DC143C"; // Condition de couleur de fond initiale
    const productDiv = document.createElement("div");

    productDiv.className = "productDiv";

    if (element.type == "ba") {
      productDiv.innerHTML = `<span>${
        index + 1
      } |  Nom: <span class="editName">${
        element.nameProduct
      }</span> | Quantite: </span><input class="quantityStock" type="number" id="quantity-${index}" min=0 value="${
        element.quantity
      }" style="background-color: ${backgroundColor}" />
        Type: <span class="editType">${
          element.type
        }</span> | Prix d'achat HT: <span class="editPurchasingPriceHT">${
        element.purchasingPriceHT
      }</span>€ | Prix de vente HT: <span class="editSellingPriceHT">${
        element.sellingPriceHT
      }</span>€ | TVA: <span class="editTva">${
        element.tva
      }</span>% | Marge HT: <span class="editMargeHT">${
        element.margeHT
      }</span>€ | Prix de vente TTC: <span class="editSellingPriceTTC">${
        element.sellingPriceTTC
      }</span>€ | Degre: ${
        element.degree
      }°</span><button class="editBtn"></button><button class="btnDel"></button><br>`;
    } else {
      productDiv.innerHTML = `<span>${
        index + 1
      } |  Nom: <span class="editName">${
        element.nameProduct
      }</span> | Quantite: </span><input class="quantityStock" type="number" id="quantity-${index}" min=0 value="${
        element.quantity
      }" style="background-color: ${backgroundColor}" />
        Type: <span class="editType">${
          element.type
        }</span> | Prix d'achat HT: <span class="editPurchasingPriceHT">${
        element.purchasingPriceHT
      }€</span> | Prix de vente HT: <span class="editSellingPriceHT">${
        element.sellingPriceHT
      }€</span> | TVA: <span class="editTva">${
        element.tva
      }</span> % | Marge HT: <span class="editMargeHT">${
        element.margeHT
      }</span>€ | Prix de vente TTC: <span class="editSellingPriceTTC">${
        element.sellingPriceTTC
      }</span>€<button class="editBtn"></button><button class="btnDel"></button><br>`;
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
  let productDivs = document.querySelectorAll(".productDiv");

  productDivs.forEach(function (productDiv) {
    let editBtn = productDiv.querySelector(".editBtn");
    let editName = productDiv.querySelector(".editName");
    let editType = productDiv.querySelector(".editType");
    let editPurchasingPriceHT = productDiv.querySelector(
      ".editPurchasingPriceHT"
    );
    let editSellingPriceHT = productDiv.querySelector(".editSellingPriceHT");

    editBtn.addEventListener("click", function () {
      if (!isEditing) {
        isEditing = true;
        // Récupérez les valeurs précédentes depuis les éléments existants
        let previousName = editName.textContent;
        let previousType = editType.textContent;
        let previousPurchasingPriceHT = parseFloat(
          editPurchasingPriceHT.textContent
        );
        let previousSellingPriceHT = parseFloat(editSellingPriceHT.textContent);
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
        let quantityStock = document.querySelector(".quantityStock");
        let editMargeHT = productDiv.querySelector(".editMargeHT");
        let editSellingPriceTTC = productDiv.querySelector(
          ".editSellingPriceTTC"
        );
        let editTva = productDiv.querySelector(".editTva");
        let editInputName = productDiv.querySelector(".editInputName");
        let editSelectType = productDiv.querySelector(".editSelectType");
        let editInputPurchasingPriceHT = productDiv.querySelector(
          ".editInputPurchasingPriceHT"
        );
        let editInputSellingPriceHT = productDiv.querySelector(
          ".editInputSellingPriceHT"
        );

        // Gestionnaire d'événements pour le calcul de la marge HT et du prix de vente TTC
        editInputPurchasingPriceHT.addEventListener("input", function () {
          calculateMarginAndTTC(productDiv);
        });

        editInputSellingPriceHT.addEventListener("input", function () {
          calculateMarginAndTTC(productDiv);
        });

        document.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            // Récupérez les nouvelles valeurs depuis les champs d'édition
            let newName = editInputName.value;
            let newType = editSelectType.value;
            let newPurchasingPriceHT = editInputPurchasingPriceHT.value;
            let newSellingPriceHT = editInputSellingPriceHT.value;
            let newQuantity = quantityStock.value;
            let newMargeHT = editMargeHT.innerHTML;
            let newSellingPriceTTC = editSellingPriceTTC.innerHTML;
            let newTva = editTva.innerHTML;

            // Mettez à jour les éléments visuels avec les nouvelles valeurs
            editName.innerHTML = newName;
            editType.innerHTML = newType;
            editPurchasingPriceHT.innerHTML = newPurchasingPriceHT;
            editSellingPriceHT.innerHTML = newSellingPriceHT;

            // Mettez à jour les données du produit dans votre système ici
            // Sauvegardez les nouvelles valeurs dans le localStorage
            let productData = {
              nameProduct: newName,
              quantity: newQuantity,
              type: newType,
              purchasingPriceHT: parseFloat(newPurchasingPriceHT),
              sellingPriceHT: parseFloat(newSellingPriceHT),
              tva: parseFloat(newTva),
              margeHT: parseFloat(newMargeHT),
              sellingPriceTTC: parseFloat(newSellingPriceTTC),
            };

            // Récupérez le tableau de produits depuis le localStorage
            let updatedStockArray =
              JSON.parse(localStorage.getItem("@StockArray")) || [];

            // Récupérez l'index de l'élément dans le tableau
            let productIndex = Array.from(
              productDiv.parentElement.children
            ).indexOf(productDiv);

            isEditing = false;

            // Mettez à jour l'élément correspondant dans le tableau
            updatedStockArray[productIndex] = productData;

            // Mettez à jour le localStorage avec le tableau mis à jour
            localStorage.setItem(
              "@StockArray",
              JSON.stringify(updatedStockArray)
            );
          }
        });
      }
    });
  });
}

function calculateMarginAndTTC(productDiv) {
  let editInputPurchasingPriceHT = productDiv.querySelector(
    ".editInputPurchasingPriceHT"
  );
  let editInputSellingPriceHT = productDiv.querySelector(
    ".editInputSellingPriceHT"
  );
  let editMargeHT = productDiv.querySelector(".editMargeHT");
  let editSellingPriceTTC = productDiv.querySelector(".editSellingPriceTTC");
  let tva = productDiv.querySelector(".editTva");

  // Récupérez les valeurs du champ de modification du prix d'achat HT et du prix de vente HT
  let purchasingPriceHT = parseFloat(editInputPurchasingPriceHT.value);
  let sellingPriceHT = parseFloat(editInputSellingPriceHT.value);

  // Vérifiez si les valeurs sont valides
  if (!isNaN(purchasingPriceHT) && !isNaN(sellingPriceHT)) {
    // Calculez la marge HT
    let margeHT = sellingPriceHT - purchasingPriceHT;
    editMargeHT.innerHTML = margeHT.toFixed(2);

    let sellingPriceTTC =
      sellingPriceHT * (1 + parseFloat(tva.innerHTML) / 100);
    editSellingPriceTTC.innerHTML = sellingPriceTTC.toFixed(2);
  }
}

function filterProduct() {
  filterInput.addEventListener("input", () => {
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
  });
}

function filterType() {
  productTypeFilter.addEventListener("input", () => {
    let filteredArray = renderStockArray.filter(function (element) {
      if (productTypeFilter.value == "") {
        return (
          element.type == "ba" ||
          element.type == "bna" ||
          element.type == "autre"
        );
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
let isEditing = false;

if (recupLS) {
  renderStockArray = JSON.parse(recupLS);
  renderStock(renderStockArray);
} else {
  renderStockArray = [];
}

modifProduct();

filterProduct();

filterType();
