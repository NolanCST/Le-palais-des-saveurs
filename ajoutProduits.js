document
  .querySelector(".formulaireProduit")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Empêchez le formulaire de s'envoyer et de rafraîchir la page
  });

document.addEventListener("DOMContentLoaded", function (event) {
  degree.style.display = "none";
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
    // Si le type est "ba", masquez l'input "degree"
    degree.style.display = "block";
  } else {
    // Sinon, affichez l'input "degree"
    degree.style.display = "none";
  }
}

function calcul() {
  addBtn.addEventListener("click", function () {
    calculPriceTTC();
    calculMargeHT();
  });
}

// VARIABLES
let product = document.querySelector(".product");
let quantity = document.querySelector(".quantity");
let purchasingPriceHT = document.querySelector(".purchasingPriceHT");
let sellingPriceHT = document.querySelector(".sellingPriceHT");
let margeHT = document.querySelector(".margeHT");
let sellingPriceTTC = document.querySelector(".sellingPriceTTC");
let type = document.querySelector(".type");
let degree = document.querySelector(".degree");
let TVA = document.querySelector(".tva");
let addBtn = document.getElementById("addBtn");
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

// function ajouterProduit(stock, produit) {
//   stock.push(produit);
// }

// let boissonAlcoolisée = new BoissonAlcoolisee(
//   nom,
//   quantite,
//   prixAchatHT,
//   prixDeVenteHT,
//   margeHT,
//   prixDeVenteTTC,
//   degreAlcool
// );
// let boissonNonAlcoolisée = new BoissonNonAlcoolisee(
//   nom,
//   quantite,
//   prixAchatHT,
//   prixDeVenteHT,
//   margeHT,
//   prixDeVenteTTC
// );
// let autreProduit = new AutreProduit(
//   nom,
//   quantite,
//   prixAchatHT,
//   prixDeVenteHT,
//   margeHT,
//   prixDeVenteTTC
// );

// ajouterProduit(stock, boissonAlcoolisee);
// ajouterProduit(stock, boissonNonAlcoolisee);
// ajouterProduit(stock, autreProduit);

// afficherStock(stock);

// function BoissonAlcoolisee(
//   nom,
//   quantite,
//   prixAchatHT,
//   prixDeVenteHT,
//   margeHT,
//   prixDeVenteTTC,
//   degreAlcool
// ) {
//   this.nom = nom;
//   this.quantite = quantite;
//   this.prixAchatHT = prixAchatHT;
//   this.prixDeVenteHT = prixDeVenteHT;
//   this.margeHT = margeHT;
//   this.prixDeVenteTTC = prixDeVenteTTC;
//   this.degreAlcool = degreAlcool;
//   this.type = "ba";
// }

// function BoissonNonAlcoolisee(
//   nom,
//   quantite,
//   prixAchatHT,
//   prixDeVenteHT,
//   margeHT,
//   prixDeVenteTTC
// ) {
//   this.nom = nom;
//   this.quantite = quantite;
//   this.prixAchatHT = prixAchatHT;
//   this.prixDeVenteHT = prixDeVenteHT;
//   this.margeHT = margeHT;
//   this.prixDeVenteTTC = prixDeVenteTTC;
//   this.type = "bna";
// }

// function AutreProduit(
//   nom,
//   quantite,
//   prixAchatHT,
//   prixDeVenteHT,
//   margeHT,
//   prixDeVenteTTC
// ) {
//   this.nom = nom;
//   this.quantite = quantite;
//   this.prixAchatHT = prixAchatHT;
//   this.prixDeVenteHT = prixDeVenteHT;
//   this.margeHT = margeHT;
//   this.prixDeVenteTTC = prixDeVenteTTC;
//   this.type = "autre";
// }
