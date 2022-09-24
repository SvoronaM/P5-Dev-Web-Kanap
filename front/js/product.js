// Récupération de l'id dans l'URL
    let string = window.location.href
    let url = new URL(string)
    let idURL = url.searchParams.get("id")
// Appel API avec l'id du produit
    let productUnit = ""
    let requestURL = "http://localhost:3000/api/products/" + idURL
fetch(requestURL)
    .then(response => response.json())
    .then(async function (resultatAPI) {
        productUnit = await resultatAPI
        showProduct(productUnit)
    })
// Ajout un message au cas où le serveur ne répond pas
    .catch(_error => {
        alert('Oops ! Le serveur ne répond pas, suivez les instructions dans le READ.me.')
    })
// Affichage du produit par page produit
function showProduct(productData) {
    document.title = productData.name
    let panelIMG = document.querySelector('.item__img')
// Insertion image du canapé
    let createPict = document.createElement('img')
    createPict.setAttribute('src', productData.imageUrl)
    createPict.setAttribute('alt', productData.altTxt)
    panelIMG.appendChild(createPict)
// Insertion du nom du canapé
    let panelH1 = document.querySelector('#title')
    panelH1.textContent = productData.name
// Insertion du prix du canapé
    let panelPrix = document.querySelector('#price')
    panelPrix.textContent = productData.price
// Insertion du choix du canapé
    let panelDescription = document.querySelector('#description')
    panelDescription.textContent = productData.description
// Récupération de #colors
    let panelOption = document.querySelector('#colors')
// Insertion du tableau des couleurs dans une variable
    let colors = productData.colors
// Parcours du tableau de couleurs et insertion de celles-ci dans choix
    for (let i = 0; i < colors.length; i++){
        let colorProduct = colors[i]
        let createOption = document.createElement('option')
        createOption.setAttribute('value', colorProduct)
        createOption.textContent = colorProduct
        panelOption.appendChild(createOption);
    }
}
// Ajouter au localstorage
// Récupération de #colors, #quantity et #addToCard
    let choixColor = document.querySelector('#colors')
    let choixQuantity = document.querySelector('#quantity')
    let sendToBasket = document.querySelector('#addToCart')
// Configuration un eventListener quand l'utilisateur clique sur ajouter au panier
sendToBasket.addEventListener('click', function (event) {
// Récupération des valeurs de quantité et de couleurs du produit choisi dans des variables
    let valueColor = choixColor.value
    let valueQuantity = choixQuantity.value
    if (valueQuantity <= 0 || valueQuantity > 100 || valueColor == ""){
        alert("Veuillez choisir une quantité entre 1 et 100 et/ou une couleur de canapé");
    } else {
        // Récupération du contenu du panier (sans produit choisi de la page actuel)
        let basket =  {}
        let basketStr = localStorage.getItem('basket')
        if (basketStr == null) {
            basket = {
                totalQuantity: 0,
                products: []
            }
        } else {
            basket = JSON.parse(basketStr)
        }
        // Creation du produit choisi
        let choixProduct = {
            id: productUnit._id,
            name: productUnit.name,
            color: valueColor,
            quantity: Number(valueQuantity),
            img: productUnit.imageUrl,
        }
        // Ajout de la quantité du produit choisi à la quantité des produits dans le panier (SI ils ont le même id et même color)
        boolean = false;
        for (let i = 0 ; i < basket.products.length; i++) {
            basketProduct = basket.products[i]
            if (basketProduct.id == choixProduct.id && basketProduct.color == choixProduct.color) {
                newQuantity = basketProduct.quantity + choixProduct.quantity
                basketProduct.quantity = newQuantity
                basket.totalQuantity = choixProduct.quantity + basket.totalQuantity
                boolean = true
                break
            }
        }
        // Ajout du produit choisi dans le panier (SI ils ont pas le même id et même color)
        if (boolean == false) {
            basket.products.push(choixProduct);
            newQuantity = basket.totalQuantity + choixProduct.quantity
            basket.totalQuantity = newQuantity
        }
        alert(`Votre commande de ${choixProduct.quantity}  ${productUnit.name}  ${choixProduct.color} est bien ajoutée au panier !`)
        let lineBasket = JSON.stringify(basket)
        localStorage.setItem("basket", lineBasket)
        // False recharge la page en utilisant la version de la page mise en cache par le navigateur.
        window.location.reload(false)
    }
})