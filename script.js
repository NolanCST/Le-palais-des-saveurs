const stock = [];
function Produit(
  nom,
  quantite,
  prixAchatHT,
  prixDeVenteHT,
  margeHT,
  prixDeVenteTTC,
  type
) {
  this.nom = nom;
  this.quantite = quantite;
  this.prixAchatHT = prixAchatHT;
  this.prixDeVenteHT = prixDeVenteHT;
  this.margeHT = margeHT;
  //   faire calcul automatique API???
  this.prixDeVenteTTC = prixDeVenteTTC;
  //   faire calcule autocmatique
  this.type = type;
  //   type= boisson alcoolisée, non alcoolisée ou autre
}

// marge hors taxes
function prixVenteHT() {
  return prixVenteHT - prixAchatHT;
}

// prix de vente TTC=
// prixVenteHT * (1 + tauxTVA / 100);
// Sans alcool 5.5%
// Alcool 20%
// Let taux = select.value;
// If ( tva == "5.5%") {
// tva = 5.5;
// } else {
// tva = 20
// };
// prixDeVenteTTX =  prixHT * tva

function BoissonAlcoolisee(
  nom,
  quantite,
  prixAchatHT,
  prixDeVenteHT,
  margeHT,
  prixDeVenteTTC,
  degreAlcool
) {
  this.nom = nom;
  this.quantite = quantite;
  this.prixAchatHT = prixAchatHT;
  this.prixDeVenteHT = prixDeVenteHT;
  this.margeHT = margeHT;
  this.prixDeVenteTTC = prixDeVenteTTC;
  this.degreAlcool = degreAlcool;
}

function BoissonNonAlcoolisee(
  nom,
  quantite,
  prixAchatHT,
  prixDeVenteHT,
  margeHT,
  prixDeVenteTTC
) {
  this.nom = nom;
  this.quantite = quantite;
  this.prixAchatHT = prixAchatHT;
  this.prixDeVenteHT = prixDeVenteHT;
  this.margeHT = margeHT;
  this.prixDeVenteTTC = prixDeVenteTTC;
}

function AutreProduit(
  nom,
  quantite,
  prixAchatHT,
  prixDeVenteHT,
  margeHT,
  prixDeVenteTTC
) {
  this.nom = nom;
  this.quantite = quantite;
  this.prixAchatHT = prixAchatHT;
  this.prixDeVenteHT = prixDeVenteHT;
  this.margeHT = margeHT;
  this.prixDeVenteTTC = prixDeVenteTTC;
}

function ajouterProduit(stock, produit) {
  stock.push(produit);
}

function afficherStock(stock) {
  // a completer je suis perdue avec les boucles
}

const boissonAlcoolisée = new BoissonAlcoolisee(
  nom,
  quantite,
  prixAchatHT,
  prixDeVenteHT,
  margeHT,
  prixDeVenteTTC,
  degreAlcool
);
const boissonNonAlcoolisée = new BoissonNonAlcoolisee(
  nom,
  quantite,
  prixAchatHT,
  prixDeVenteHT,
  margeHT,
  prixDeVenteTTC
);
const autreProduit = new AutreProduit(
  nom,
  quantite,
  prixAchatHT,
  prixDeVenteHT,
  margeHT,
  prixDeVenteTTC
);

ajouterProduit(stock, boissonAlcoolisee);
ajouterProduit(stock, boissonNonAlcoolisee);
ajouterProduit(stock, autreProduit);

afficherStock(stock);
