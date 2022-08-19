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
    let creatDivIMG = document.creatElement('div');
    creatDivIMG.className = 'cart__item__img';
    creatArticle.appendChild(creatDivIMG);
    // insertion des images
    let creatPict = document.creatElement('img');
    creatPict.setAttribute('src', produit.img);
    creatPict.setAttribute('alt', "Photographie d'un canapé");
    creatDivIMG.appendChild(creatPict);
    // insertion div content
    let creatDivContDes = document.creatElement('div');
    creatDivContDes.className = 'cart__item__content';
    creatArticle.appendChild(creatDivContDes);
    // insertion div description
    let creatDivDes = document.creatElement('div');
    creatDivDes.className = 'cart__item__content__description';
    creatDivContDes.appendChild(creatDivDes);
    // insertion H2
    let creatH2 = document.creatElement('h2');
    creatH2.textContent = produit.name;
    creatDivDes.appendChild(creatH2);
    // insertion P color
    let creatpColor = document.creatElement('p');
    creatpColor.textContent = "Couleur : " + produit.color;
    creatDivDes.appendChild(creatpColor);


