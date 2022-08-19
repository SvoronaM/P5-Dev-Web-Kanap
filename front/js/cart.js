// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //
let basketStr = localStorage.getItem('basket');
let basket = JSON.parse(basketStr);

// Récupération de l'élement "cart__items"
let cartPanel = document.querySelector('#cart__items');

// Affichage des produits dans la page panier (avec les prix en fetch)
function showProductBasket(produit) {
    // AFFICHAGE DU/DES PRODUIT(S) PANIER
    // insertion des articles
    let creatArticle = document.creatElement('article');
    creatArticle.className = 'cart__item';
    creatArticle.setAttribute('data-id', produit.id);
    creatArticle.setAttribute('data-color', produit.color);
    cartPanel.appendChild(creatArticle);
    // insertion div de l'img
    let createDivIMG = document.createElement('div');
    createDivIMG.className = 'cart__item__img';
    createArticle.appendChild(createDivIMG);