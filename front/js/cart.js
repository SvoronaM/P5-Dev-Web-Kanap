// Récupération du contenu du panier à partir du localstorage
let basketStr = localStorage.getItem('basket');
let basket = JSON.parse(basketStr);
let products = []
// Récupération de l'élement "cart__items"
let cartPanel = document.querySelector('#cart__items');
// Affichage des produits dans la page panier (avec les prix en fetch)
// AFFICHAGE DU/DES PRODUIT(S) PANIER
function showProductBasket() {
    let createArticle = document.createElement('article');
    function showProductBasketCreatArticlePict(basket) {
        // insertion des articles
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
    }
    showProductBasketCreatArticlePict(basket)
    // insertion div content description
    let createDivDes = document.createElement('div');
    let createDivContDes = document.createElement('div');
    function showProductBasketCreatContDescr(basket) {
        createDivContDes.className = 'cart__item__content';
        createArticle.appendChild(createDivContDes);
        // insertion div description
        createDivDes.className = 'cart__item__content__description';
        createDivContDes.appendChild(createDivDes);
        // insertion H2
        let createH2 = document.createElement('h2');
        createH2.textContent = basket.products[0].name;
        createDivDes.appendChild(createH2);
        // insertion P color
        let createpColor = document.createElement('p');
        createpColor.textContent = "Couleur : " + basket.products[0].color;
        createDivDes.appendChild(createpColor);
    }
    showProductBasketCreatContDescr(basket)
    // recupération du prix en utilisant l'id du produit
    function showProductBasketPr(basket) {
        let productUnit = "";
        fetch("http://localhost:3000/api/products/" + basket.products[0].id)
            .then(response => response.json())
            .then(async function (resultatAPI) {
                productUnit = await resultatAPI;
                // insertion P price
                let createpPrice = document.createElement('p');
                createpPrice.textContent = "Prix : " + productUnit.price + " € / canapé";
                createDivDes.appendChild(createpPrice);
            })
            .catch(error => alert("Erreur : " + error));
    }
    showProductBasketPr(basket)
    // insertion div content settings
    let createDivContSet = document.createElement('div');
    let createDivContSetQuantity = document.createElement('div');
    function showProductBasketQuant(basket) {
        createDivContSet.className = 'cart__item__content__settings';
        createDivContDes.appendChild(createDivContSet);
        // insertion div settings quantity
        createDivContSetQuantity.className = 'cart__item__content__settings__quantity';
        createDivContSet.appendChild(createDivContSetQuantity);
        // insertion P quantity
        let createpQuantity = document.createElement('p');
        createpQuantity.textContent = "Qté :";
        createDivContSetQuantity.appendChild(createpQuantity);
    }
    showProductBasketQuant(basket)
    // insertion input quantity
    function showProductBasketInpQuant(basket) {
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
    showProductBasketInpQuant(basket)
}
// Récupération de produit dans l'API via son id
async function getProduct(id) {
 return fetch("http://localhost:3000/api/products/" + id)
     .then(response => response.json())
     .catch(error => alert("Erreur : " + error));
}
// Changement quantité et prix
function changeQuantity() {
    let quantityItem = document.querySelectorAll('.itemQuantity');
    for (let k = 0; k < quantityItem.length; k++) {
        quantityItemUnit = quantityItem[k];
        quantityItemUnit.addEventListener('change', function(event) {
            for (let l = 0 ; l < basket.products.length; l++) {
                basketProduct = basket.products[l];
                let articleQuantityItemID = event.target.closest('article').getAttribute("data-id");
                let articleQuantityItemColor = event.target.closest('article').getAttribute("data-color");
                newQuantityValue = event.target.valueAsNumber;

                if (basketProduct.id == articleQuantityItemID && basketProduct.color == articleQuantityItemColor) {
                    qtyToAdd = newQuantityValue - basketProduct.quantity;
                    basketProduct.quantity = newQuantityValue;
                    basket.totalQuantity = basket.totalQuantity + qtyToAdd;
                    let lineBasket = JSON.stringify(basket);
                    localStorage.setItem("basket", lineBasket);
                    window.location.reload();
                }
            }
        })
    }
}
// Suppression d'un canapé
function delProduct() {
    let delItem = document.querySelectorAll('.deleteItem');
    for (let j = 0; j < delItem.length; j++) {
        delItemUnit = delItem[j];
        delItemUnit.addEventListener('click', function(event) {
            let articleDelItemID = event.target.closest('article').getAttribute("data-id");
            let articleDelItemColor = event.target.closest('article').getAttribute("data-color");

            let basket = JSON.parse(basketStr);
            productToDel = basket.products.find(el => el.id == articleDelItemID && el.color == articleDelItemColor);

            result = basket.products.filter(el => el.id !== articleDelItemID || el.color !== articleDelItemColor);
            basket.products = result;

            newQuantity = basket.totalQuantity - productToDel.quantity;
            basket.totalQuantity = newQuantity;
            priceToDel = productToDel.quantity * productToDel.price;
            alert('Vous avez bien supprimé votre produit du panier !');

            if (basket.totalQuantity == 0) {
                localStorage.clear();
                window.location.reload()
            } else {
                let lineBasket = JSON.stringify(basket);
                localStorage.setItem("basket", lineBasket);
                window.location.reload()
            }
        })
    }
}
// SI le panier est vide, afficher "panier vide"
// SINON parser le panier, et utiliser la function showproductbasket
async function showCart() {
    if (basketStr == null) {
        let createpEmpty = document.createElement('p');
        createpEmpty.textContent = 'Votre panier est vide';
        cartPanel.appendChild(createpEmpty);
    } else {
        let totalPrice = 0;
        for (let i = 0 ; i < basket.products.length; i++) {
            basketProduct = basket.products[i];
            showProductBasket(basketProduct);
            let productsPrice = await getProduct(basketProduct.id);
            let productQuantity = basketProduct.quantity;
            totalPrice += productsPrice.price * productQuantity;
            let totalPriceElt = document.querySelector('#totalPrice');
            totalPriceElt.textContent = totalPrice;
        }
        let totalQuantity = document.querySelector('#totalQuantity');
        totalQuantity.textContent = basket.totalQuantity;
        changeQuantity()
        delProduct()
    }
}
showCart();