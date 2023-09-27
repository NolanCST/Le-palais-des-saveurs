let formProduit = document.querySelectorAll(".formulaireProduit");
let AddBtn = document.querySelector("#AddBtn");
let container = document.querySelector(".mainCont");
let subCont = document.querySelector(".subCont");

let LSProductArray = JSON.parse(localStorage.getItem("@produitArray"));

let productArray;

if (LSProductArray) {
  productArray = LSProductArray;
  renderContact(productArray);
} else {
  productArray = [];
}

function ContactPro(Produit, firstName, email, phone, siret, companyName) {
  this.lastName = lastName;
  this.firstName = firstName;
  this.email = email;
  this.phone = phone;
  this.siret = siret;
  this.companyName = companyName;
  this.type = "pro";
}

AddBtn.addEventListener("click", renderProduct);
