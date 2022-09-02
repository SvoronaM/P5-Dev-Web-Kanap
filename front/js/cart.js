// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE
let basketStr = localStorage.getItem('basket');
let basket = JSON.parse(basketStr);
let products = []

// Récupération de l'élement "cart__items"
let cartPanel = document.querySelector('#cart__items');
// Affichage des produits dans la page panier (avec les prix en fetch)
async function getProduct(id) {
    return fetch("http://localhost:3000/api/products/" + id)
        .then(response => response.json())
        .catch(error => alert("Erreur : " + error));
}
function showProductBasketArticleImg(basket) {
    // Insertion des articles
    let creatArticle = document.createElement('article');
    creatArticle.className = 'cart__item';
    creatArticle.setAttribute('data-id', basket.products[0].id);
    creatArticle.setAttribute('data-color', basket.products[0].color);
    cartPanel.appendChild(creatArticle);

    // Insertion div de l'img
   let creatDivIMG = document.createElement('div');
    creatDivIMG.className = 'cart__item__img';
    creatArticle.appendChild(creatDivIMG);
     // Insertion des images
     let creatPict = document.createElement('img');
     creatPict.setAttribute('src', basket.products[1].img);
     creatPict.setAttribute('alt', "Photographie d'un canapé");
     creatDivIMG.appendChild(creatPict);
     console.log(basket.products[1].img)
 }
/* showProductBasketArticleImg(basket)*/
/*function showProductBasketDivH(basket) {
    // Insertion div content
    let creatDivContDes = document.createElement('div');
    creatDivContDes.className = 'cart__item__content';
    creatArticle.appendChild(creatDivContDes);
    // Insertion div description
    let creatDivDes = document.createElement('div');
    creatDivDes.className = 'cart__item__content__description';
    creatDivContDes.appendChild(creatDivDes);
    // Insertion H2
    let creatH2 = document.createElement('h2');
    creatH2.textContent = basket.name;
    creatDivDes.appendChild(creatH2);
}
function showProductBasketPetPrix(basket) {
    // Insertion P color
    let creatpColor = document.createElement('p');
    creatpColor.textContent = "Couleur : " + basket.color;
    creatDivDes.appendChild(creatpColor);
    // Recupération du prix en utilisant l'id du produit
    let productUnit = "";
    fetch("http://localhost:3000/api/products/" + basket.id)
        .then(response => response.json())
        .then(async function (resultatAPI) {
            productUnit = await resultatAPI;
            // insertion P price
            let creatpPrice = document.createElement('p');
            creatpPrice.textContent = "Prix : " + productUnit.price + " € / canapé";
            creatDivDes.appendChild(creatpPrice);
        })
        .catch(error => alert("Erreur : " + error));
}
function showProductBasketSet(basket) {
    // Insertion div content settings
    let creatDivContSet = document.createElement('div');
    creatDivContSet.className = 'cart__item__content__settings';
    creatDivContDes.appendChild(creatDivContSet);
    // Insertion div settings quantity
    let creatDivContSetQuantity = document.createElement('div');
    creatDivContSetQuantity.className = 'cart__item__content__settings__quantity';
    creatDivContSet.appendChild(creatDivContSetQuantity);
}
function showProductBasketQuant(basket) {
    // Insertion P quantity
    let creatpQuantity = document.createElement('p');
    creatpQuantity.textContent = "Qté :";
    creatDivContSetQuantity.appendChild(creatpQuantity);
    // Insertion input quantity
    let creatInputQuantity = document.createElement('input');
    creatInputQuantity.className = 'itemQuantity';
    creatInputQuantity.setAttribute('type', 'number');
    creatInputQuantity.setAttribute('name', 'itemQuantity');
    creatInputQuantity.setAttribute('min', '0');
    creatInputQuantity.setAttribute('max', '100');
    creatInputQuantity.setAttribute('value', produit.quantity);
    creatDivContSetQuantity.appendChild(creatInputQuantity);
}
function showProductBasketDel(basket) {
    // Insertion div settings delete
    let creatDivContSetDel = document.createElement('div');
    creatDivContSetDel.className = 'cart__item__content__settings__delete';
    creatDivContSet.appendChild(creatDivContSetDel);
    // Insertion P delete item
    let creatpDelete = document.createElement('p');
    creatpDelete.className = 'deleteItem';
    creatpDelete.textContent = "Supprimer";
    creatDivContSetDel.appendChild(creatpDelete);
}*/
function showProductBasket() {
    showProductBasketArticleImg(basket)

}
    showProductBasket()
