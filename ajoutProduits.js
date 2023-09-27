// VARIABLES
let product = document.querySelector(".product");
let quantity = document.querySelector(".quantity");
let purchasingPriceHT = document.querySelector(".purchasingPriceHT");
let sellingPriceHT = document.querySelector(".sellingPriceHT");
let margeHT = document.querySelector(".margeHT");
let sellingPriceTTC = document.querySelector(".sellingPriceTTC");
let type = document.querySelector(".type");
let degree = document.querySelector(".degree");
let TVA = document.querySelector(".TVA");
const stockArray = [];

// Prix toutes taxes comprises
function calculPriceTTC() {
  let calculTTC;
  if (type.value == "ba") {
    TVA = 0.2;
    calculTTC = sellingPriceHT * (1 + TVA);
  } else {
    TVA = 0.055;
    calculTTC = sellingPriceHT * (1 + TVA);
  }
  sellingPriceTTC.innerText = calculTTC;
  console.log("PENIS");
}

calculPriceTTC();

// // marge hors taxes
// function calculMargeHT() {
//   return prixVenteHT - prixAchatHT;
// }

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
