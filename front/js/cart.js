// Crée une fonction pour enregister cart dans le localStorage en JSON
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
// Fonction pour récupérer la cart depuis le localStorage
function getCart() {
    let cart = localStorage.getItem("cart");
    // Si le localStorage est vide, retourne un tableau vide
    if (cart == null) {
        return [];
        // Si il n'est pas vide, retourne cart dans son format original
    } else {
        return JSON.parse(cart);
    }
}
// Fonction pour supprimer des produits de la cart
function removeFromCart(product) {
    let cart = getCart();
    // Filtrer la carte pour garder uniquement les produits avec une id différentes ou les produits avec une différentes couleur et la même id
    cart = cart.filter((p) => p.id != product.id || p.color != product.color);
    saveCart(cart);
}
// Fonction pour récuperer le prix total des produits dans la cart
function getNumberOfProducts() {
    let cart = getCart();
    // Définie numberOfProduct = 0
    let numberOfProduct = 0;
    // Parcoure chaque produit
    for (let product of cart) {
        // Pour chaque produit dans la cart, ajoute la quantité du produit a numberOfProduct
        numberOfProduct += product.quantity;
    }
    // Retourne le nombre total de produit
    return numberOfProduct;
}
// Fonction pour avoir le prix total de la cart
function getTotalPrice(product, quantity) {
    // Pour chaque produit dans la carte, ajoute le prix total a totalCartPrice (product.price * quantité)
    totalCartPrice += product.price * quantity;
    // Retourne le prix total de la carte
    return totalCartPrice;
}
// Fonction pour modifié la quantité d'un produit
function modifyQuantity(product, quantity) {
    let cart = getCart();
    // vérifie si un produit avec le meme id et la même couleur sont déja dans la carte
    let productFound = cart.find((p) => p.id == product.id && p.color == product.color);
    // Si oui, ajuste la nouvelle quantité
    if (productFound != undefined) {
        productFound.quantity = quantity;
        // si la nouvelle quantité <= 0, supprime le produit de la carte et recharge la page
        if(quantity <= 0){
            document.location.reload();
            removeFromCart(productFound);
            alert("L'article a été retiré de votre panier");
            // Si la nouvelle quantité > 100, envoi un message d'alert et recharge la page
        }else if(quantity > 100){
            document.location.reload();
            alert("La quantité est limitée à 100 pièces");
        }else{
            saveCart(cart);
        }
    }
}
// Fonction pour modifié le prix total
function modifyTotalPrice(product, oldQuantity, newQuantity) {
    // Si la nouvelle quantité est supérieur a l'ancienne, ajoute et retourne le prix total
    if (newQuantity > oldQuantity) {
        totalCartPrice += product.price * (newQuantity - oldQuantity);
        return totalCartPrice;
        // Si la nouvelle quantité est inférieur a l'ancienne, enleve et retourne le prix total
    } else if (newQuantity < oldQuantity) {
        totalCartPrice -= product.price * (oldQuantity - newQuantity);
        return totalCartPrice;
    }
}
// Récupération de la cart avec la fonction getCart
let cart = getCart();
// Récupération des éléments dans une constante
const cartList = document.getElementById("cart__items");
const cartHeading = document.querySelector("h1");
const totalDisplay = document.querySelector(".cart__price p");
const orderForm = document.querySelector(".cart__order");
// Récupération des éléments qui afficheront le prix total et la quantité de produit dans la cart
let totalProductsQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
// Initialisation de totalCartPrice qui sera mis à jour ultérieurement avec le résultat renvoyé par la fonction getTotalPrice
let totalCartPrice = 0;
for (let product of cart) {
    // Pour chaque produit, récupération de l'identifiant, de la couleur, de la quantité et du nom
    let productId = product.id;
    let productColor = product.color;
    let productQuantity = product.quantity;
    let productName = product.name;
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then((response) => response.json())
        // Définir la réponse de l'API en tant que productDetails et définir l'action à exécuter pour chaque produit du panier
        .then((productDetails) => {
            // Insertion de l'élément article, définition des attributs, ajout de la classe cart__item et définition en tant qu'enfant de l'élément cartList
            let productArticle = document.createElement("article");
            productArticle.classList.add("cart__item");
            productArticle.setAttribute("data-id", productId);
            productArticle.setAttribute("data-color", productColor);
            cartList.appendChild(productArticle);
            // Insertion de l'élément productImgContainer
            let productImgContainer = document.createElement("div");
            productImgContainer.classList.add("cart__item__img");
            productArticle.appendChild(productImgContainer);
            // Insertion de l'élément productImg
            let productImg = document.createElement("img");
            productImg.setAttribute("src", productDetails.imageUrl);
            productImg.setAttribute("alt", productDetails.altTxt);
            productImgContainer.appendChild(productImg);
            // Insertion de l'élément productContent
            let productContent = document.createElement("div");
            productContent.classList.add("cart__item__content");
            productArticle.appendChild(productContent);
            // Insertion de l'élément productContentDescription
            let productContentDescription = document.createElement("div");
            productContentDescription.classList.add("cart__item__content__description");
            productContent.appendChild(productContentDescription);
            // Insertion de l'élément productName
            let productName = document.createElement("h2");
            productName.textContent = productDetails.name;
            productContentDescription.appendChild(productName);
            // Insertion de l'élément poductColorPicked
            let productColorPicked = document.createElement("p");
            productColorPicked.textContent = productColor;
            productContentDescription.appendChild(productColorPicked);
            // Insertion de l'élément productPrice (insertion de la valeur renvoyée par l'API, suivie du symbole €)
            let productPrice = document.createElement("p");
            productPrice.textContent = `${productDetails.price} €`;
            productContentDescription.appendChild(productPrice);
            // Insertion de l'élément productContentSettings
            let productContentSettings = document.createElement("div");
            productContentSettings.classList.add("cart__item__content__settings");
            productContent.appendChild(productContentSettings);
            // Insertion de l'élément productQuantitySettings
            let productQuantitySettings = document.createElement("div");
            productQuantitySettings.classList.add("cart__item__content__settings__quantity");
            productContentSettings.appendChild(productQuantitySettings);
            // Insertion de l'élément productQuantityPickedLabel
            let productQuantityPickedLabel = document.createElement("p");
            productQuantityPickedLabel.textContent = "Quantité : ";
            productQuantitySettings.appendChild(productQuantityPickedLabel);
            // Insertion de l'élément productQuantityPicked, ajout d'attributs, insertion de la quantité sélectionnée par l'utilisateur à l'étape précédente
            let productQuantityPicked = document.createElement("input");
            productQuantityPicked.setAttribute("type", "number");
            productQuantityPicked.setAttribute("name", "itemQuantity");
            productQuantityPicked.setAttribute("min", 1);
            productQuantityPicked.setAttribute("max", 100);
            productQuantityPicked.setAttribute("value", productQuantity);
            productQuantityPicked.classList.add("itemQuantity");
            productQuantitySettings.appendChild(productQuantityPicked);
            // Insertion de l'élément productDelete
            let productDelete = document.createElement("div");
            productDelete.classList.add("cart__item__content__settings__delete");
            productContentSettings.appendChild(productDelete);
            // Insertion de l'élément productDeleteButton
            let productDeleteButton = document.createElement("p");
            productDeleteButton.classList.add("deleteItem");
            productDeleteButton.textContent = "Supprimer";
            productDelete.appendChild(productDeleteButton);
            // Ajout du listener pour exécuter l'action removeFromCart lorsque le bouton de suppression est cliqué
            productDeleteButton.addEventListener("click", function () {
                removeFromCart(product);
                alert("L'article a été retiré de votre panier");
                document.location.reload();
            });
            // Utilisation de la fonction getNumberOfProduct pour afficher la quantité totale sur la page
            totalProductsQuantity.textContent = getNumberOfProducts();
            // Utilisation de la fonction getTotalPrice pour afficher le prix total sur la page
            totalPrice.textContent = getTotalPrice(productDetails, productQuantity);
            // Définition de la quantité actuelle prélevée comme ancienne quantité pour une utilisation ultérieure lors d'un événement de modification
            let oldQuantity = Number(productQuantityPicked.value);
            // ajout Eventlistener de quantité et définir l'action à exécuter
            productQuantityPicked.addEventListener("change", () => {
                // Définition de la nouvelle quantité de produit à l'aide de la fonction modifyQuantity - saveCart() lors de cette étape avec la fonction modifyQuantity
                productQuantity = modifyQuantity(product,Number(productQuantityPicked.value));
                // Utilisation de la fonction modifyTotalPrice pour calculer le nouveau prix de chaque article, en fonction de la variation de quantité
                totalPrice.textContent = modifyTotalPrice(productDetails,oldQuantity,Number(productQuantityPicked.value));
                // Définition de la (new) quantité actuelle prélevée comme ancienne quantité pour une utilisation ultérieure lors d'un événement de modification
                oldQuantity = Number(productQuantityPicked.value);
                // Récupération de la quantité totale dans le panier à l'aide de la fonction getNumberOfProduct
                totalProductsQuantity.textContent = getNumberOfProducts();
            });
        })
        // Si la demande à l'API a échoué, création d'un message pour chaque produit pour informer l'utilisateur que quelque chose s'est mal passé
        .catch((error) => {
            console.log("Erreur dans le chargement du panier" + error);
            let cartErrorMessage = document.createElement("h2");
            cartErrorMessage.textContent = `L'article ${productName} de couleur ${productColor} que vous avez sélectionné semble inaccessible pour le moment.`;
            cartErrorMessage.style.textAlign = "center";
            cartErrorMessage.style.padding = "15px";
            cartList.appendChild(cartErrorMessage);
            // Modification du texte dans l'élément des totaux et suppression du formulaire de commande de la page
            totalDisplay.textContent = "Il est impossible de procéder à la commande pour le moment. Nous vous invitons à réessayer ultérieurement";
            totalDisplay.style.textAlign = "center";
            orderForm.style.display = "none";
        });
}
// Modification de la structure lorsque que la Cart est vide
// Si le panier est vide : modification de l'en-tête, du texte dans l'élément totaux et suppression du bon de commande de la page
if (cart.length === 0) {
    cartHeading.textContent = "Votre panier est vide";
    totalDisplay.innerText = "Consulter notre catalogue";
    totalDisplay.style.textAlign = "center";
    orderForm.style.display = "none";
}
// Récupération des éléments du formulaire et du bouton d'envoi
let form = document.querySelector(".cart__order__form");
let submitButton = document.querySelector("#order");
// RegExp - correspondances d'un texte avec un motif donne
let firstNameRegExp = new RegExp(/[a-z A-Z]{2,50}$/);
let nameRegExp = new RegExp(/[a-z A-Z]{2,50}$/);
let adressRegExp = new RegExp(/[0-9 A-z ' ,.]{2,50}$/);
let cityRegExp = new RegExp(/[0-9]{5}[a-z A-Z]{2,50}$/);
let emailRegExp = new RegExp(/[a-z A-Z 0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$/);
// Prénom
let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
form.firstName.addEventListener('change', function(e) {
    let value = e.target.value;
    if (firstNameRegExp.test(value)){
        firstNameErrorMsg.innerText = '';
    } else {
        firstNameErrorMsg.innerText = "Champ invalide, veuillez vérifier votre prénom.";
    }
});
// Nom
let lastNameErrorMsg = form.lastName.nextElementSibling;
form.lastName.addEventListener('change', function(e) {
    let value = e.target.value;
    if (nameRegExp.test(value)){
        lastNameErrorMsg.innerText = '';
    } else {
        lastNameErrorMsg.innerText = "Champ invalide, veuillez vérifier votre nom.";
    }
});
// Adresse
let adressErrorMsg = document.querySelector('#addressErrorMsg');
form.address.addEventListener('change', function(e) {
    let value = e.target.value;
    if (adressRegExp.test(value)){
        adressErrorMsg.innerText = '';
    } else {
        adressErrorMsg.innerText = "Vous ne pouvez utiliser que des chiffres, lettres, espaces, - et ' ";
    }
});
// Ville
let cityErrorMsg = document.querySelector('#cityErrorMsg');
form.city.addEventListener('change', function(e) {
    let value = e.target.value;
    if (cityRegExp.test(value)){
        cityErrorMsg.innerText = '';
    } else {
        cityErrorMsg.innerText = "Veuillez respecter le format CODE POSTAL (5 CHIFFRES) suivi du nom de la VILLE. Exemple : 34000 Montpellier";
    }
});
// Email
let emailErrorMsg = document.querySelector('#emailErrorMsg');
form.email.addEventListener('change', function(e) {
    let value = e.target.value;
    if (emailRegExp.test(value)){
        emailErrorMsg.innerText = '';
    } else {
        emailErrorMsg.innerText = "Champ invalide, veuillez vérifier votre adresse email.";
    }
});
// Passer commande
let btnOrder = document.querySelector('#order');
btnOrder.addEventListener('click', function(e) {
    // si l'évènement n'est pas explicitement géré, l'action par défaut ne devrait pas être exécutée comme elle l'est normalement.
    e.preventDefault();
    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputEmail = document.getElementById('email');
     if (
        firstName.value === ""
        || lastName.value === ""
        || address.value === ""
        || city.value === ""
        || email.value === ""
    ) {
        alert("Vous devez renseigner vos coordonnées pour passer la commande !");
        e.preventDefault();
    } else if (
        nameRegExp.test(inputFirstName.value) ==  false
        || nameRegExp.test(inputLastName.value) ==  false
        || adressRegExp.test(inputAddress.value) ==  false
        || nameRegExp.test(inputCity.value) ==  false
        || emailRegExp.test(inputEmail.value) ==  false
    ) {
        alert("Vérifiez vos coordonnées pour passer la commande !");
        e.preventDefault();
    } else {
        productID = [];
        for (let m = 0; m < cart.products; m++) {
            productID.push(cart.products[m].id);
        }
         // Création de l'objet order qui sera envoyé à l'API
        let order = {
            contact : {
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                address: inputAddress.value,
                city: inputCity.value,
                email: inputEmail.value,
            },
            products : productID
        }
         // Envoi de l'objet order et du tableau products à l'API
        fetch("http://localhost:3000/api/products/order", {
            // .post() permet d'envoyer des données
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            // Obtenir la réponse au format JSON
            .then((response) => response.json())
            // Définition de la réponse de l'API en tant que resultOrder et définition de l'action à exécuter
            .then(async function (resultOrder) {
                // await permet d'attendre la résolution d'une promesse
                order = await resultOrder;
                document.location.href = "confirmation.html?orderId=" + order.orderId;
                //Vider la localStorage
                localStorage.clear();
            })
    }
});