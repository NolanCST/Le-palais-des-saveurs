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
      }€</span> | Prix de vente HT: <span class="editSellingPriceHT">${
        element.sellingPriceHT
      }€</span><span> | TVA: ${element.tva} | Marge HT: ${
        element.margeHT
      }€ | Prix de vente TTC: ${element.sellingPriceTTC}€ | Degre: ${
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
      }€</span><span> | TVA: ${element.tva} | Marge HT: ${
        element.margeHT
      }€ | Prix de vente TTC: ${
        element.sellingPriceTTC
      }€ </span><button class="editBtn"></button><button class="btnDel"></button><br>`;
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
      editName.innerHTML = `<input class="editInput editInputName" type="text"/>`;
      editType.innerHTML = `<select name="productType" class="editSelectType">
      <option value="">---Type---</option>
      <option value="ba">ba</option>
      <option value="bna">bna</option>
      <option value="autre">autre</option>
    </select>`;
      editPurchasingPriceHT.innerHTML = `<input class="editInput editInputPurchasingPriceHT" type="number"/>`;
      editSellingPriceHT.innerHTML = `<input class="editInput editInputSellingPriceHT" type="number"/>`;
      // Mettez à jour les données du produit avec les nouvelles valeurs
      let editInputName = document.querySelector(".editInputName");
      let editSelectType = document.querySelector(".editSelectType");
      let editInputPurchasingPriceHT = document.querySelector(
        ".editInputPurchasingPriceHT"
      );
      let editInputSellingPriceHT = document.querySelector(
        ".editInputSellingPriceHT"
      );
      document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          editName.innerHTML = `<span>${editInputName.value}</span>`;
          editType.innerHTML = `<span>${editSelectType.value}</span>`;
          editPurchasingPriceHT.innerHTML = `<span>${editInputPurchasingPriceHT.value}€</span>`;
          editSellingPriceHT.innerHTML = `<span>${editInputSellingPriceHT.value}€</span>`;
          const updatedProductName = editName.innerHTML;
          const updatedProductType = editType.innerHTML;
          const updatedProductPPrice = editPurchasingPriceHT.innerHTML;
          const updatedProductSPrice = editSellingPriceHT.innerHTML;
        }
      });
      // Mettez à jour les données du produit dans votre système (par exemple, localStorage)
      //   // Vous pouvez ajouter ici la logique pour sauvegarder les modifications
    });
  });
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
