// Récupération du contenu du panier à partir du localstorage
let basketStr = localStorage.getItem('basket');
let basket = JSON.parse(basketStr);
let products = []

// Récupération de l'élement "cart__items"
let cartPanel = document.querySelector('#cart__items');

// Affichage des produits dans la page panier (avec les prix en fetch)
// AFFICHAGE DU/DES PRODUIT(S) PANIER
function showProductBasketCreatArticle(basket) {
    // insertion des articles
    let createArticle = document.createElement('article');
    createArticle.className = 'cart__item';
    createArticle.setAttribute('data-id', basket.products[0].id);
    createArticle.setAttribute('data-color', basket.products[0].color);
    cartPanel.appendChild(createArticle);


    // insertion div de l'img

    let createDivIMG = document.createElement('div');
    createDivIMG.className = 'cart__item__img';
    createArticle.appendChild(createDivIMG);
    // insertion des images
    let createPict = document.createElement('img');
    createPict.setAttribute('src', basket.products[0].img);
    createPict.setAttribute('alt', "Photographie d'un canapé");
    createDivIMG.appendChild(createPict);
    console.log(basket.products[0].img)
}
showProductBasketCreatArticle(basket)
/*    // insertion div content description
    let createDivContDes = document.createElement('div');
    createDivContDes.className = 'cart__item__content';
    createArticle.appendChild(createDivContDes);
    // insertion div description
    let createDivDes = document.createElement('div');
    createDivDes.className = 'cart__item__content__description';
    createDivContDes.appendChild(createDivDes);
    // insertion H2
    let createH2 = document.createElement('h2');
    createH2.textContent = products.name;
    createDivDes.appendChild(createH2);
    // insertion P color
    let createpColor = document.createElement('p');
    createpColor.textContent = "Couleur : " + products.color;
    createDivDes.appendChild(createpColor);
    // recupération du prix en utilisant l'id du produit
    let productUnit = "";
    fetch("http://localhost:3000/api/products/" + products.id)
        .then(response => response.json())
        .then(async function (resultatAPI) {
            productUnit = await resultatAPI;
            // insertion P price
            let createpPrice = document.createElement('p');
            createpPrice.textContent = "Prix : " + productUnit.price + " € / canapé";
            createDivDes.appendChild(createpPrice);
        })
        .catch(error => alert("Erreur : " + error));
    // insertion div content settings
    let createDivContSet = document.createElement('div');
    createDivContSet.className = 'cart__item__content__settings';
    createDivContDes.appendChild(createDivContSet);
    // insertion div settings quantity
    let createDivContSetQuantity = document.createElement('div');
    createDivContSetQuantity.className = 'cart__item__content__settings__quantity';
    createDivContSet.appendChild(createDivContSetQuantity);
    // insertion P quantity
    let createpQuantity = document.createElement('p');
    createpQuantity.textContent = "Qté :";
    createDivContSetQuantity.appendChild(createpQuantity);
    // insertion input quantity
    let createInputQuantity = document.createElement('input');
    createInputQuantity.className = 'itemQuantity';
    createInputQuantity.setAttribute('type', 'number');
    createInputQuantity.setAttribute('name', 'itemQuantity');
    createInputQuantity.setAttribute('min', '0');
    createInputQuantity.setAttribute('max', '100');
    createInputQuantity.setAttribute('value', products.quantity);
    createDivContSetQuantity.appendChild(createInputQuantity);
    // insertion div settings delete
    let createDivContSetDel = document.createElement('div');
    createDivContSetDel.className = 'cart__item__content__settings__delete';
    createDivContSet.appendChild(createDivContSetDel);
    // insertion P delete
    let createpDelete = document.createElement('p');
    createpDelete.className = 'deleteItem';
    createpDelete.textContent = "Supprimer";
    createDivContSetDel.appendChild(createpDelete);
}
showProductBasket(basket)
// Récupération de produit dans l'API via son id
async function getProduct(id) {
    return fetch("http://localhost:3000/api/products/" + id)
        .then(response => response.json())
        .catch(error => alert("Erreur : " + error));
}*/
