// Crée une fonction pour enregister cart dans le localStorage en JSON
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// Crée une fonction pour récupérer la cart depuis le localStorage
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
// Crée une fonction pour ajouter les produits a cart
function addToCart(product) {
    // Récupération de la carte
    let cart = getCart();
    // Vérifie si il y a un produit avec l'id et la couleur identique dans la cart
    let productFound = cart.find((p) => p.id === product.id && p.color === product.color);
    // Si oui, modifie la quantité en ajoutens la nouvelle
    if (productFound != undefined) {
        productFound.quantity += product.quantity;
        // Si non, ajoute le nouveau produit a cart
    } else {
        cart.push(product);
    }
    // Enregistre la carte modifié avec la fonction saveCart
    saveCart(cart);
}
// récupération de la cart avec la fonction getCart
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
    totalDisplay.innerHTML ='<a href="./index.html">Consulter notre catalogue</a>';
    totalDisplay.style.textAlign = "center";
    orderForm.style.display = "none";
}


// Récupération des éléments du formulaire et du bouton d'envoi
let form = document.querySelector(".cart__order__form");
let submitButton = document.querySelector("#order");

// Ajout d'attributs de modèle et d'espace réservé à chaque entrée - EventListener pour afficher un message (succès ou erreur) dans l'élément sous chaque entrée
form.firstName.setAttribute("pattern", "[a-z A-Z-']{2,50}");
form.firstName.setAttribute("placeholder", "Kevin");
form.firstName.addEventListener("input", () => {
    textValidity(form.firstName);
});
form.lastName.setAttribute("pattern", "[a-z A-Z-']{2,50}");
form.lastName.setAttribute("placeholder", "Durant");
form.lastName.addEventListener("input", () => {
    textValidity(form.lastName);
});
form.address.setAttribute("pattern", "[a-zA-Z 0-9'-]{2,50}");
form.address.setAttribute("placeholder", "39 boulevard Emmanuel Rouquier");
form.address.addEventListener("input", () => {
    adressValidity(form.address);
});
form.city.setAttribute("pattern", "[0-9]{5}[a-zA-Zéèôöîïûùü' -]{2,50}");
form.city.setAttribute("placeholder", "06130 Grasse");
form.city.addEventListener("input", () => {
    cityValidity(form.city);
});
form.email.setAttribute("placeholder", "exemple@mail.com");
form.email.addEventListener("input", () => {
    emailValidity(form.email);
});

// Initialisation du tableau de produits qui sera envoyé à l'API
let products = [];

// Pour chaque produit du panier, pousser le productId dans le tableau products
for (let product of cart) {
    products.push(product.id);
}

// Écouter l'événement submit sur le formulaire - Empêcher l'action submit de recharger la page avec la méthode prevendDefault
form.addEventListener("submit", (event) => {
    event.preventDefault();
    // Création de l'objet contact qui sera envoyé à l'API
    let contact = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        city: form.city.value,
        email: form.email.value,
    };
    // Envoi de l'objet contact et du tableau products à l'API
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, products }),
    })
        // Obtenir la réponse au format JSON
        .then((response) => response.json())
        // Définition de la réponse de l'API en tant que orderDetails et définition de l'action à exécuter
        .then((orderDetails) => {
            console.log("L'envoi du formulaire à bien été effectué");
            // Obtenir l'élément orderId de la réponse de l'API et l'affecter à une variable pour une utilisation ultérieure dans l'url
            let orderId = orderDetails.orderId;
            console.log(orderId);
            if(orderId){
                // Redirection de l'utilisateur sur la page de confirmation et ajout de orderId dans l'url
                window.location.href = `./confirmation.html?id=${orderId}`;
                //Vider la Cart
                clearCart();
            }else{
                alert("Il semble y avoir un problème. Veuillez ré-essayer ultérieurement")
            }
        })
        .catch((error) => {
            // Affichage d'un message d'erreur si la requête envoyée à l'API n'est pas terminée avec succès
            console.log("L'envoi du formulaire à l'API a rencontré un problème" + error);
        });
});