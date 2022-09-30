// Crée une fonction pour enregister cart dans le localStorage en JSON
function saveCart(cart) {
   localStorage.setItem('cart', JSON.stringify(cart));
}


// Crée une fonction pour récupérer la cart depuis le localStorage
function getCart() {
    let cart = localStorage.getItem('cart');
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

// Crée une fonction pour supprimer des produits de la cart
function removeFromCart(product) {
    let cart = getCart();
    // Filtrer la carte pour garder uniquement les produits avec une id différentes ou les produits avec une différentes couleur et la même id
    cart = cart.filter((p) => p.id != product.id || p.color != product.color);
    saveCart(cart);
}

// Crée une fonction pour supprimer la cart quand la commande est passé
function clearCart() {
    let cart = getCart()
    for (let product of cart) {
        removeFromCart(product);
    }
}

// Crée une fonction pour récuperer le prix total des produits dans la cart
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

// Crée une fonction pour avoir le prix total de la cart
function getTotalPrice(product, quantity) {
    // Pour chaque produit dans la carte, ajoute le prix total a totalCartPrice (product.price * quantité)
    totalCartPrice += product.price * quantity;
    // Retourne le prix total de la carte
    return totalCartPrice;
}

// Crée une fonction pour modifié la quantité d'un produit
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


// Crée une fonction pour modifié le prix total
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



// Crée une fonction pour vérifier la validité des text inputs (firstName, LastName) et affiche un message (success or error)
function textValidity(input) {
    let nameRegExp = /^[a-zéèôöîïûùü' -]{2,50}$/gi;
    let test = nameRegExp.test(input.value);
    if (test == true) {
        input.nextElementSibling.textContent = "Champ valide";
    } else {
        input.nextElementSibling.textContent = "Vous ne pouvez utiliser que des lettres, espaces, - et ' ";
    }
}

// Crée une fonction pour vérifier la validité des text/number inputs (City) et affiche un message ( succes or error)
function cityValidity(input) {
    let cityRegExp = /^[0-9]{5}[a-zéèôöîïûùü' -]{2,50}$/gi;
    let test = cityRegExp.test(input.value);
    if (test == true) {
        input.nextElementSibling.textContent = "Champ valide";
    } else {
        input.nextElementSibling.textContent = "Veuillez respecter le format CODE POSTAL (5 CHIFFRES) suivi du nom de la VILLE. Exemple : 06130 Grasse";
    }
}


// Crée une fonction pour vérifier la validité des text/number input (adress) et affiche un message ( succes or error)
function adressValidity(input) {
    let adressRegExp = /^[a-z0-9éèôöîïûùü' -]{2,50}$/gi;
    let test = adressRegExp.test(input.value);
    if (test == true) {
        input.nextElementSibling.textContent = "Champ valide";
    } else {
        input.nextElementSibling.textContent = "Vous ne pouvez utiliser que des chiffres, lettres, espaces, - et ' ";
    }
}


// Crée une fonction pour vérifier la validité de l'Email inputs et affiche un message ( succes or error)
function emailValidity(input) {
    let emailRegExp = /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/gi;
    test = emailRegExp.test(input.value);
    if (test === true) {
        input.nextElementSibling.textContent = "Champ valide";
    } else {
        input.nextElementSibling.textContent = "Veuillez saisir une adresse email valide";
    }
}