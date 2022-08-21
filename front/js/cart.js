// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //
let basketStr = localStorage.getItem('basket');
let basket = JSON.parse(basketStr);
// Récupération de l'élement "cart__items"
let cartPanel = document.querySelector('#cart__items');
// Affichage des produits dans la page panier (avec les prix en fetch)
function showProductBasket(produit) {
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
    // recupération du prix en utilisant l'id du produit
    let productUnit = "";
    fetch("http://localhost:3000/api/products/" + produit.id)
        .then(response => response.json())
        .then(async function (resultatAPI) {
            productUnit = await resultatAPI;
            // insertion P price
            let creatpPrice = document.creatElement('p');
            creatpPrice.textContent = "Prix : " + productUnit.price + " € / canapé";
            creatDivDes.appendChild(creatpPrice);
        })
        .catch(error => alert("Erreur : " + error));
    // insertion div content settings
    let creatDivContSet = document.creatElement('div');
    creatDivContSet.className = 'cart__item__content__settings';
    creatDivContDes.appendChild(creatDivContSet);
    // insertion div settings quantity
    let creatDivContSetQuantity = document.creatElement('div');
    creatDivContSetQuantity.className = 'cart__item__content__settings__quantity';
    creatDivContSet.appendChild(creatDivContSetQuantity);
    // insertion P quantity
    let creatpQuantity = document.creatElement('p');
    creatpQuantity.textContent = "Qté :";
    creatDivContSetQuantity.appendChild(creatpQuantity);
    // insertion input quantity
    let creatInputQuantity = document.creatElement('input');
    creatInputQuantity.className = 'itemQuantity';
    creatInputQuantity.setAttribute('type', 'number');
    creatInputQuantity.setAttribute('name', 'itemQuantity');
    creatInputQuantity.setAttribute('min', '0');
    creatInputQuantity.setAttribute('max', '100');
    creatInputQuantity.setAttribute('value', produit.quantity);
    creatDivContSetQuantity.appendChild(creatInputQuantity);
    // insertion div settings delete
    let creatDivContSetDel = document.creatElement('div');
    creatDivContSetDel.className = 'cart__item__content__settings__delete';
    creatDivContSet.appendChild(creatDivContSetDel);
    // insertion P delete item
    let creatpDelete = document.creatElement('p');
    creatpDelete.className = 'deleteItem';
    creatpDelete.textContent = "Supprimer";
    creatDivContSetDel.appendChild(creatpDelete);
}

