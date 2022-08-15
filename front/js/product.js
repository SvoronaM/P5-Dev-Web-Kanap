// Récupération de l'id dans l'URL
    let string = window.location.href;
    let url = new URL(string);
    let idURL = url.searchParams.get("id");

// Appel API avec l'id du produit
    let productUnit = "";
    let requestURL = "http://localhost:3000/api/products/" + idURL
fetch(requestURL)
    .then(response => response.json())
    .then(async function (resultatAPI) {
        productUnit = await resultatAPI;
        showProduct(productUnit);
    })
    .catch(error => alert("Erreur : " + error));

// Affichage du produit par page produit
function showProduct(productSheet) {
    document.title = productSheet.name;
    let panelIMG = document.querySelector('.item__img');

    // insertion image du canapé
    let createPict = document.createElement('img');
    createPict.setAttribute('src', productSheet.imageUrl);
    createPict.setAttribute('alt', productSheet.altTxt);
    panelIMG.appendChild(createPict);

    // insertion du nom du canapé
    let panelH1 = document.querySelector('#title');
    panelH1.textContent = productSheet.name;

    // insertion du prix du canapé
    let panelPrice = document.querySelector('#price');
    panelPrice.textContent = productSheet.price;

    // insertion du choix du canapé
    let panelDescription = document.querySelector('#description');
    panelDescription.textContent = productSheet.description;

    // récupération de #colors
    let panelOption = document.querySelector('#colors');

    // insertion du tableau des couleurs dans une variable
    let colors = productSheet.colors;

    // parcours du tableau de couleurs et insertion de celles-ci dans choix
    for (let i = 0; i < colors.length; i++){
        let colorProduct = colors[i];
        let createOption = document.createElement('option');
        createOption.setAttribute('value', colorProduct);
        createOption.textContent = colorProduct;
        panelOption.appendChild(createOption);
    }
}

// Ajouter au localstorage

// Récupération de #colors, #quantity et #addToCard
    let choixColor = document.querySelector('#colors');
    let choixQuantity = document.querySelector('#quantity');
    let sendToBasket = document.querySelector('#addToCart');

// Ecoute du click sur l'ajout au panier
sendToBasket.addEventListener('click', function (event) {
// Récupération des valeurs de quantité et de couleurs du produit choisi dans des variables
    let valueColor = choixColor.value;
    let valueQuantity = choixQuantity.value;
        if (valueQuantity <= 0 || valueQuantity > 100 || valueColor == ""){
        alert("Veuillez choisir une quantité entre 1 et 100 et/ou une couleur de canapé");
    } else {
// Récupération du contenu du panier (sans produit choisi de la page actuel)
     let basketStr = localStorage.getItem('basket')
        if (basketStr == null) {
            let basket = {
                totalQuantity: 0,
                products: []
            }
        } else {
            var basket = JSON.parse(basketStr)
        }

// Creation du produit choisi
     let chosenProduct = {
            id: productUnit._id,
            name: productUnit.name,
            color: valueColor,
            quantity: Number(valueQuantity),
            img: productUnit.imageUrl,
        }

// Ajout de la quantité du produit choisi à la quantité des produits dans le panier (SI ils ont le même id et même color)
        boolean = false;
        for (let i = 0 ; i < basket.products.length; i++) {
            basketProduct = basket.products[i];
            if (basketProduct.id == chosenProduct.id && basketProduct.color == chosenProduct.color) {
                newQuantity = basketProduct.quantity + chosenProduct.quantity;
                basketProduct.quantity = newQuantity;
                basket.totalQuantity = chosenProduct.quantity + basket.totalQuantity;
                boolean = true;
                break;
            }
        }

// Ajout du produit choisi dans le panier (SI ils ont pas le même id et même color)
        if (boolean == false) {
            basket.products.push(chosenProduct);
            newQuantity = basket.totalQuantity + chosenProduct.quantity;
            basket.totalQuantity = newQuantity;
        }
        alert(`Votre commande de ${chosenProduct.quantity}  ${productUnit.name}  ${chosenProduct.color} est bien ajoutée au panier !`);
        let lineBasket = JSON.stringify(basket);
        localStorage.setItem("basket", lineBasket);
        window.location.reload();
    }
});