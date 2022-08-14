// Récupération de id dans URL
let string = window.location.href
let url = new URL(string)
let idURL = url.searchParams.get("id")
// Appel API avec l'id du produit
let requestURL = "http://localhost:3000/api/products/" + idURL
fetch(requestURL)
    .then(response => response.json())
    .then(async function (resultatAPI) {
        let  productUnit = await resultatAPI
        showProduct(productUnit)
    })
    // Message au cas où le serveur ne répond pas
    .catch(error => alert('Le serveur ne répond pas, suivez les instructions dans le README.md' + error))
        // Modification de contenu de chaque variable avec les bonnes données :
function showProduct(data) {
    document.title = data.name
    let panelImages = document.querySelector('.item__img')
            // Insertion image du canapé
    let createPict = document.createElement('img')
    createPict.setAttribute('src', data.imageUrl)
    createPict.setAttribute('alt', data.altTxt)
    panelImages.appendChild(createPict)
            // Insertion du nom du canapé
    let panelH1 = document.querySelector('#title')
    panelH1.textContent = data.name
            // Insertion du prix du canapé
    let panelPrice = document.querySelector('#price')
    panelPrice.textContent =data.price
            // Insertion du choix du canapé
     let panelDescription = document.querySelector('#description')
      panelDescription.textContent = data.description
            // Récupération de #colors
      let panelOption = document.querySelector('#colors')
            // Insertion du tableau des couleurs dans une variable
      let colors = data.colors
            // Parcour du tableau des couleurs et insertion de celles-ci dans choix
      for (let i = 0; i < colors.length; i++){
                let colorProduct = colors[i]
                let createOption = document.createElement('option')
                createOption.setAttribute('value', colorProduct)
                createOption.textContent = colorProduct
                panelOption.appendChild(createOption)
            }
        }

//     Récupération des donnes par rapport au choix de l'utilisateur
// récupération de #colors, #quantity et #addToCard
let chosenColor = document.querySelector('#colors');
let chosenQuantity = document.querySelector('#quantity');
let sendToBasket = document.querySelector('#addToCart');

// écoute du click sur l'ajout au panier
sendToBasket.addEventListener('click', function (event) {
    // récupération des valeurs de quantité et de couleurs du produit choisi dans des variables
    let valueColor = chosenColor.value;
    let valueQuantity = chosenQuantity.value;
    if (valueQuantity <= 0 || valueQuantity > 100 || valueColor == ""){
        alert("Veuillez choisir une quantité entre 1 et 100 et/ou une couleur de canapé");
    } else {
        // récupération du contenu du panier (sans produit choisi de la page actuel)
        let basketStr = localStorage.getItem('basket');
        if (basketStr == null) {
            let basket = {
                totalQuantity: 0,
                products: []
            }
        } else {
            let basket = JSON.parse(basketStr)
        }

        // creation du produit choisi
        let chosenProduct = {
            id: productUnit._id,
            name: productUnit.name,
            color: valueColor,
            quantity: Number(valueQuantity),
            img: productUnit.imageUrl,
        }

        // ajout de la quantité du produit choisi à la quantité des produits dans le panier (SI ils ont le même id et même color)
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

        // ajout du produit choisi dans le panier (SI ils ont pas le même id et même color)
        if (boolean == false) {
            basket.products.push(chosenProduct);
            newQuantity = basket.totalQuantity + chosenProduct.quantity;
            basket.totalQuantity = newQuantity;
        }
        alert('Votre commande de ' + chosenProduct.quantity + ' ' + productUnit.name + ' ' + chosenProduct.color + ' est bien ajoutée au panier !');
        let lineBasket = JSON.stringify(basket);
        localStorage.setItem("basket", lineBasket);
        window.location.reload();
    }
});