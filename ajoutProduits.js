document.addEventListener("DOMContentLoaded", function (event) {
  degree.style.display = "none";
  console.log("TEST");
});

// Prix toutes taxes comprises
function calculPriceTTC() {
  let calculTTC;
  let tauxTVA = parseFloat(TVA.value);
  if (type.value == "ba") {
    tauxTVA = 0.2;
  } else if (type.value == "bna" || type.value == "autre") {
    tauxTVA = 0.055;
  } else {
    tauxTVA = "";
  }
  calculTTC = parseFloat(sellingPriceHT.value) * (1 + tauxTVA);

  if (!isNaN(calculTTC)) {
    sellingPriceTTC.value = calculTTC.toFixed(2);
  } else {
    sellingPriceTTC.value = "";
  }
}

// marge hors taxes
function calculMargeHT() {
  let valeurCalculMargeHT =
    parseFloat(sellingPriceHT.value) - parseFloat(purchasingPriceHT.value);
  if (!isNaN(valeurCalculMargeHT)) {
    margeHT.value = valeurCalculMargeHT.toFixed(2);
  } else {
    margeHT.value = "";
  }
}

// Mettre à jour la TVA en fonction du type sélectionné
function updateTva() {
  if (type.value == "ba") {
    TVA.value = "20%";
  } else if (type.value == "bna" || type.value == "autre") {
    TVA.value = "5.5%";
  } else {
    TVA.value = "";
  }
}

function degreeAlcool() {
  if (type.value == "ba") {
    // Si le type est "ba", afficher l'input "degree"
    degree.style.display = "block";
    console.log("TEST2");
  } else {
    // Sinon, masquer l'input "degree"
    degree.style.display = "none";
    console.log("TEST3");
  }
}

function addProduct() {
  document
    .querySelector(".formulaireProduit")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Empêchez le formulaire de s'envoyer et de rafraîchir la page
      let product;
      let nameProductValue = nameProduct.value;
      let quantityValue = quantity.value;
      let purchasingPriceHTValue = purchasingPriceHT.value;
      let sellingPriceHTValue = sellingPriceHT.value;
      let margeHTValue = margeHT.value;
      let sellingPriceTTCValue = sellingPriceTTC.value;
      let degreeValue = degree.value;

      if (type.value == "ba") {
        product = new BoissonAlcoolisee(
          nameProductValue,
          quantityValue,
          purchasingPriceHTValue,
          sellingPriceHTValue,
          margeHTValue,
          sellingPriceTTCValue,
          degreeValue
        );
      } else if (type.value == "bna") {
        product = new BoissonNonAlcoolisee(
          nameProductValue,
          quantityValue,
          purchasingPriceHTValue,
          sellingPriceHTValue,
          margeHTValue,
          sellingPriceTTCValue
        );
      } else if (type.value == "autre") {
        product = new AutreProduit(
          nameProductValue,
          quantityValue,
          purchasingPriceHTValue,
          sellingPriceHTValue,
          margeHTValue,
          sellingPriceTTCValue
        );
      } else {
        alert(
          `Erreur lors de la saisie des données, merci de réitérer votre demande`
        );
        return;
      }
      console.log("TEST");
      stockArray.push(product);
      let saveProduct = JSON.stringify(stockArray);
      localStorage.setItem("@StockArray", saveProduct);
      formulaireProduit.reset();
      console.log("TEST2");
    });
}

// VARIABLES
let nameProduct = document.querySelector(".nameProduct");
let quantity = document.querySelector(".quantity");
let purchasingPriceHT = document.querySelector(".purchasingPriceHT");
let sellingPriceHT = document.querySelector(".sellingPriceHT");
let margeHT = document.querySelector(".margeHT");
let sellingPriceTTC = document.querySelector(".sellingPriceTTC");
let type = document.querySelector(".type");
let degree = document.querySelector("#degree");
let TVA = document.querySelector(".tva");
let formulaireProduit = document.querySelector(".formulaireProduit");
const stockArray = [];

// Ajouter un gestionnaire d'événements pour le champ de sélection du type
type.addEventListener("change", updateTva);
type.addEventListener("change", calculPriceTTC);
type.addEventListener("change", degreeAlcool);
// Ajouter des gestionnaires d'événements pour afficher la marge automatiquement
purchasingPriceHT.addEventListener("input", calculMargeHT);
sellingPriceHT.addEventListener("input", calculMargeHT);
// Ajouter des gestionnaires d'événements pour afficher le prix TTC automatiquement
TVA.addEventListener("input", calculPriceTTC);
sellingPriceHT.addEventListener("input", calculPriceTTC);

addProduct();

function BoissonAlcoolisee(
  nameProduct,
  quantity,
  purchasingPriceHT,
  sellingPriceHT,
  margeHT,
  sellingPriceTTC,
  degree
) {
  this.nameProduct = nameProduct;
  this.quantity = quantity;
  this.purchasingPriceHT = purchasingPriceHT;
  this.sellingPriceHT = sellingPriceHT;
  this.margeHT = margeHT;
  this.sellingPriceTTC = sellingPriceTTC;
  this.degree = degree;
  this.tva = "20%";
  this.type = "ba";
}

function BoissonNonAlcoolisee(
  nameProduct,
  quantity,
  purchasingPriceHT,
  sellingPriceHT,
  margeHT,
  sellingPriceTTC
) {
  this.nameProduct = nameProduct;
  this.quantity = quantity;
  this.purchasingPriceHT = purchasingPriceHT;
  this.sellingPriceHT = sellingPriceHT;
  this.margeHT = margeHT;
  this.sellingPriceTTC = sellingPriceTTC;
  this.tva = "5.5%";
  this.type = "bna";
}

function AutreProduit(
  nameProduct,
  quantity,
  purchasingPriceHT,
  sellingPriceHT,
  margeHT,
  sellingPriceTTC
) {
  this.nameProduct = nameProduct;
  this.quantity = quantity;
  this.purchasingPriceHT = purchasingPriceHT;
  this.sellingPriceHT = sellingPriceHT;
  this.margeHT = margeHT;
  this.sellingPriceTTC = sellingPriceTTC;
  this.tva = "5.5%";
  this.type = "autre";
}
